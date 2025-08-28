import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export interface OutcomeProgress {
  metric: string;
  current: number;
  target: number;
  percentage: number;
  display: string;
}

export interface StageProgress {
  stageId: string;
  stageName: string;
  outcomes: OutcomeProgress[];
}

/**
 * Calculate progress for all outcomes in a stage
 */
export async function calculateStageProgress(stageId: string): Promise<StageProgress | null> {
  try {
    const stage = await client.stage.findUnique({
      where: { id: stageId },
      include: {
        tasks: {
          include: {
            userProgress: true
          }
        }
      }
    });

    if (!stage || !stage.outcomeTargets || !stage.outcomeActuals) {
      return null;
    }

    const targets = stage.outcomeTargets as Record<string, number>;
    const actuals = stage.outcomeActuals as Record<string, number>;
    
    const outcomes: OutcomeProgress[] = [];

    for (const [metric, target] of Object.entries(targets)) {
      const current = actuals[metric] || 0;
      const percentage = target > 0 ? Math.round((current / target) * 100) : 0;
      
      outcomes.push({
        metric,
        current,
        target,
        percentage,
        display: `${current} of ${target} ${metric.replace('_', ' ')}`
      });
    }

    return {
      stageId: stage.id,
      stageName: stage.name,
      outcomes
    };
  } catch (error) {
    console.error('Error calculating stage progress:', error);
    return null;
  }
}

/**
 * Update outcome actuals when a task is completed
 */
export async function updateOutcomeProgress(
  stageId: string, 
  taskId: string, 
  userProgressId: string,
  actualMetrics: Record<string, number>
): Promise<boolean> {
  try {
    // Get the task to see what it should contribute
    const task = await client.task.findUnique({
      where: { id: taskId }
    });

    if (!task || !task.taskTarget) {
      return false;
    }

    const contributions = task.taskTarget as Record<string, number>;
    
    // Get current stage actuals
    const stage = await client.stage.findUnique({
      where: { id: stageId }
    });

    if (!stage || !stage.outcomeActuals) {
      return false;
    }

    const currentActuals = stage.outcomeActuals as Record<string, number>;
    const updatedActuals = { ...currentActuals };

    // Update actuals based on task completion
    for (const [metric, contribution] of Object.entries(contributions)) {
      const actualValue = actualMetrics[metric] || contribution; // Use provided actual or fallback to planned
      updatedActuals[metric] = (updatedActuals[metric] || 0) + actualValue;
    }

    // Update stage actuals
    await client.stage.update({
      where: { id: stageId },
      data: { outcomeActuals: updatedActuals }
    });

    // Update user progress with actual metrics
    await client.userProgress.update({
      where: { id: userProgressId },
      data: { outcomeActuals: actualMetrics }
    });

    return true;
  } catch (error) {
    console.error('Error updating outcome progress:', error);
    return false;
  }
}

/**
 * Get progress summary for all stages in a program
 */
export async function getProgramProgress(programId: string): Promise<StageProgress[]> {
  try {
    const stages = await client.stage.findMany({
      where: { programId },
      orderBy: { order: 'asc' }
    });

    const progress: StageProgress[] = [];

    for (const stage of stages) {
      const stageProgress = await calculateStageProgress(stage.id);
      if (stageProgress) {
        progress.push(stageProgress);
      }
    }

    return progress;
  } catch (error) {
    console.error('Error getting program progress:', error);
    return [];
  }
}

/**
 * Example usage and demonstration
 */
export async function demonstrateOutcomeProgress() {
  console.log('🎯 Outcome Progress Demonstration\n');

  // Get all stages
  const stages = await client.stage.findMany({
    include: { program: true }
  });

  for (const stage of stages) {
    console.log(`📋 ${stage.program.name} - ${stage.name}`);
    
    if (stage.outcomeTargets && stage.outcomeActuals) {
      const targets = stage.outcomeTargets as Record<string, number>;
      const actuals = stage.outcomeActuals as Record<string, number>;
      
      for (const [metric, target] of Object.entries(targets)) {
        const current = actuals[metric] || 0;
        const percentage = target > 0 ? Math.round((current / target) * 100) : 0;
        
        console.log(`  ${current} of ${target} ${metric.replace('_', ' ')} (${percentage}%)`);
      }
    } else {
      console.log('  No outcome tracking configured');
    }
    
    console.log('');
  }
}

// Example: How to use the functions
export const exampleUsage = `
// Calculate progress for a specific stage
const progress = await calculateStageProgress('stage-id');
console.log(progress?.outcomes);

// Update progress when a task is completed
await updateOutcomeProgress(
  'stage-id',
  'task-id', 
  'user-progress-id',
  { 'leads': 5, 'qualified_leads': 2 }
);

// Get all progress for a program
const programProgress = await getProgramProgress('program-id');
`;
