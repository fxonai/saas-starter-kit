/**
 * Soft delete utility functions
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Soft delete a program
 */
export async function softDeleteProgram(programId: string) {
  return await prisma.program.update({
    where: { id: programId },
    data: { 
      deletedAt: new Date(),
      isActive: false 
    }
  });
}

/**
 * Soft delete a stage
 */
export async function softDeleteStage(stageId: string) {
  return await prisma.stage.update({
    where: { id: stageId },
    data: { 
      deletedAt: new Date(),
      isActive: false 
    }
  });
}

/**
 * Soft delete a task
 */
export async function softDeleteTask(taskId: string) {
  return await prisma.task.update({
    where: { id: taskId },
    data: { 
      deletedAt: new Date(),
      isActive: false 
    }
  });
}

/**
 * Soft delete a team member
 */
export async function softDeleteTeamMember(teamId: string, userId: string) {
  return await prisma.teamMember.update({
    where: { 
      teamId_userId: {
        teamId,
        userId
      }
    },
    data: { 
      deletedAt: new Date()
    }
  });
}

/**
 * Soft delete user progress
 */
export async function softDeleteUserProgress(progressId: string) {
  return await prisma.userProgress.update({
    where: { id: progressId },
    data: { 
      deletedAt: new Date()
    }
  });
}

/**
 * Restore a soft-deleted program
 */
export async function restoreProgram(programId: string) {
  return await prisma.program.update({
    where: { id: programId },
    data: { 
      deletedAt: null,
      isActive: true 
    }
  });
}

/**
 * Restore a soft-deleted stage
 */
export async function restoreStage(stageId: string) {
  return await prisma.stage.update({
    where: { id: stageId },
    data: { 
      deletedAt: null,
      isActive: true 
    }
  });
}

/**
 * Restore a soft-deleted task
 */
export async function restoreTask(taskId: string) {
  return await prisma.task.update({
    where: { id: taskId },
    data: { 
      deletedAt: null,
      isActive: true 
    }
  });
}

/**
 * Get only active (non-deleted) programs
 */
export async function getActivePrograms(teamId?: string) {
  return await prisma.program.findMany({
    where: {
      deletedAt: null,
      isActive: true,
      ...(teamId && { teamId })
    }
  });
}

/**
 * Get only active (non-deleted) stages
 */
export async function getActiveStages(programId?: string) {
  return await prisma.stage.findMany({
    where: {
      deletedAt: null,
      isActive: true,
      ...(programId && { programId })
    }
  });
}

/**
 * Get only active (non-deleted) tasks
 */
export async function getActiveTasks(stageId?: string) {
  return await prisma.task.findMany({
    where: {
      deletedAt: null,
      isActive: true,
      ...(stageId && { stageId })
    }
  });
}
