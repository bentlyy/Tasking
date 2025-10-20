import { prisma } from "../config/prisma";

export class DashboardService {
  async getStats(userId: number) {
    const totalProjects = await prisma.projectMember.count({
      where: { userId }
    });

    const totalTasks = await prisma.task.count({
      where: {
        project: {
          members: { some: { userId } }
        }
      }
    });

    const tasksPending = await prisma.task.count({ where: { status: "TODO" } });
    const tasksInProgress = await prisma.task.count({ where: { status: "IN_PROGRESS" } });
    const tasksCompleted = await prisma.task.count({ where: { status: "DONE" } });

    return {
      totalProjects,
      totalTasks,
      tasksPending,
      tasksInProgress,
      tasksCompleted
    };
  }
}
