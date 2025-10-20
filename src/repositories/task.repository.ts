import { prisma } from "../config/prisma";

export class TaskRepository {
  static create(data: any) {
    return prisma.task.create({ data });
  }

  static getByProject(projectId: number) {
    return prisma.task.findMany({
      where: { projectId },
      orderBy: { createdAt: "desc" }
    });
  }

  static update(taskId: number, data: any) {
    return prisma.task.update({
      where: { id: taskId },
      data
    });
  }

  static delete(taskId: number) {
    return prisma.task.delete({ where: { id: taskId } });
  }

  static getById(taskId: number) {
    return prisma.task.findUnique({ where: { id: taskId } });
  }
}
