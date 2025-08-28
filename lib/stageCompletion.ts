import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export interface StageCompletionStatus {
  stageId: string;
  stageName: string;
  isCompleted: boolean;
  completionPercentage: number;
  missingDependencies: string[];
  unmetCriteria: string[];
}

export interface OutcomeProgress {
  metric: string;
  current: number;
  target: number;
  percentage: number;
}

/**
 * Check if a stage can be started based on dependencies
 */
export async function canStartStage(
  programUserId: string, 
  stageId: string
): Promise<{ canStart: boolean; missingDependencies: string[] }> {
  const stage = await client.stage.findUnique({
    where: { id: stageId },
    include: {
      program: {
        include: {
          stages: {
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  });

  if (!stage || !stage.dependencies) {
    return { canStart: true, missingDependencies: [] };
  }

  const dependencies = stage.dependencies as any;
  const missingDependencies: string[] = [];

  // Check required stages
  if (dependencies.requiredStages && dependencies.requiredStages.length > 0) {
    for (const requiredStageName of dependencies.requiredStages) {
      const requiredStage = stage.program.stages.find(s => s.name === requiredStageName);
      if (requiredStage) {
        const isCompleted = await isStageCompleted(programUserId, requiredStage.id);
        if (!isCompleted) {
          missingDependencies.push(`Stage "${requiredStageName}" must be completed first`);
        }
      }
    }
  }

  // Check required outcomes
  if (dependencies.requiredOutcomes && Object.keys(dependencies.requiredOutcomes).length > 0) {
    // Implementation for outcome-based dependencies
    // This would check if specific outcome targets were met in previous stages
  }

  return {
    canStart: missingDependencies.length === 0,
    missingDependencies
  };
}

/**
 * Check if a stage is completed based on completion criteria
 */
export async function isStageCompleted(
  programUserId: string, 
  stageId: string
): Promise<boolean> {
  const stage = await client.stage.findUnique({
    where: { id: stageId },
    include: {
      tasks: true,
      userProgress: {
        where: { programUserId }
      }
    }
  });

  if (!stage || !stage.completionCriteria) {
    return false;
  }

  const criteria = stage.completionCriteria as any;
  const userProgress = stage.userProgress[0];

  if (!userProgress) {
    return false;
  }

  // Check if all tasks are completed
  if (criteria.requiredTasksCompleted) {
    const taskProgress = await client.userProgress.findMany({
      where: {
        programUserId,
        taskId: { in: stage.tasks.map(t => t.id) }
      }
    });

    const completedTasks = taskProgress.filter(p => p.status === 'COMPLETED').length;
    if (completedTasks < stage.tasks.length) {
      return false;
    }
  }

  // Check outcome targets
  if (criteria.requiredOutcomeTargets) {
    const currentOutcomes = userProgress.outcomeActuals as Record<string, number> || {};
    const requiredOutcomes = criteria.requiredOutcomeTargets;

    for (const [metric, target] of Object.entries(requiredOutcomes)) {
      const current = currentOutcomes[metric] || 0;
      if (current < target) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Calculate stage completion percentage
 */
export async function getStageCompletionPercentage(
  programUserId: string, 
  stageId: string
): Promise<number> {
  const stage = await client.stage.findUnique({
    where: { id: stageId },
    include: {
      tasks: true,
      userProgress: {
        where: { programUserId }
      }
    }
  });

  if (!stage) {
    return 0;
  }

  const userProgress = stage.userProgress[0];
  if (!userProgress) {
    return 0;
  }

  // Task completion percentage
  const taskProgress = await client.userProgress.findMany({
    where: {
      programUserId,
      taskId: { in: stage.tasks.map(t => t.id) }
    }
  });

  const completedTasks = taskProgress.filter(p => p.status === 'COMPLETED').length;
  const taskPercentage = stage.tasks.length > 0 ? (completedTasks / stage.tasks.length) * 100 : 0;

  // Outcome completion percentage
  let outcomePercentage = 0;
  if (stage.completionCriteria) {
    const criteria = stage.completionCriteria as any;
    if (criteria.requiredOutcomeTargets) {
      const currentOutcomes = userProgress.outcomeActuals as Record<string, number> || {};
      const requiredOutcomes = criteria.requiredOutcomeTargets;
      
      let totalOutcomeProgress = 0;
      let outcomeCount = 0;

      for (const [metric, target] of Object.entries(requiredOutcomes)) {
        const current = currentOutcomes[metric] || 0;
        const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;
        totalOutcomeProgress += percentage;
        outcomeCount++;
      }

      outcomePercentage = outcomeCount > 0 ? totalOutcomeProgress / outcomeCount : 0;
    }
  }

  // Weight: 70% tasks, 30% outcomes
  return (taskPercentage * 0.7) + (outcomePercentage * 0.3);
}

/**
 * Get detailed stage completion status
 */
export async function getStageCompletionStatus(
  programUserId: string, 
  stageId: string
): Promise<StageCompletionStatus> {
  const stage = await client.stage.findUnique({
    where: { id: stageId }
  });

  if (!stage) {
    throw new Error('Stage not found');
  }

  const canStart = await canStartStage(programUserId, stageId);
  const isCompleted = await isStageCompleted(programUserId, stageId);
  const completionPercentage = await getStageCompletionPercentage(programUserId, stageId);

  return {
    stageId,
    stageName: stage.name,
    isCompleted,
    completionPercentage,
    missingDependencies: canStart.missingDependencies,
    unmetCriteria: [] // Could be expanded to show specific unmet criteria
  };
}
