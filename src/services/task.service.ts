import { prisma } from "../config/prisma";
import { TaskRepository } from "../repositories/task.repository";

export class TaskService {
  async create(ownerId: number, projectId: number, title: string, description?: string) {
    // ✅ Validar que el usuario tenga permisos en el proyecto
    const member = await prisma.projectMember.findFirst({
      where: { projectId, userId: ownerId, role: "OWNER" }
    });

    if (!member) throw new Error("No tienes permiso para crear tareas");

    return TaskRepository.create({
      title,
      description,
      projectId,
      createdById: ownerId
    });
  }

  async getByProject(projectId: number, userId: number) {
    // ✅ Validar que el usuario es miembro del proyecto
    const member = await prisma.projectMember.findFirst({
      where: { projectId, userId }
    });

    if (!member) throw new Error("No tienes acceso a este proyecto");

    return TaskRepository.getByProject(projectId);
  }

  async update(taskId: number, data: any) {
    return TaskRepository.update(taskId, data);
  }

  async changeStatus(taskId: number, status: string) {
    return TaskRepository.update(taskId, { status });
  }

  async assignUser(taskId: number, userId: number) {
    return TaskRepository.update(taskId, { assigneeId: userId });
  }

  async delete(taskId: number) {
    return TaskRepository.delete(taskId);
  }
}
