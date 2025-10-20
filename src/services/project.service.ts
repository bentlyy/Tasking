import { ProjectRepository } from "../repositories/project.repository";
import { prisma } from "../config/prisma";

export class ProjectService {
  async create(data: { name: string; description?: string; ownerId: number }) {
    return ProjectRepository.create(data);
  }

  async getAll(userId: number) {
    // Lista los proyectos donde el usuario es miembro
    return ProjectRepository.getAllForUser(userId);
  }

  async getById(projectId: number, userId: number) {
    // Verifica si el usuario pertenece al proyecto
    const member = await prisma.projectMember.findFirst({
      where: { projectId, userId }
    });

    if (!member) {
      throw new Error("No tienes acceso a este proyecto");
    }

    return ProjectRepository.getById(projectId);
  }

  async update(projectId: number, data: { name?: string; description?: string }) {
    return prisma.project.update({
      where: { id: projectId },
      data
    });
  }

  async delete(projectId: number) {
    return prisma.project.delete({ where: { id: projectId } });
  }

  async addMember(projectId: number, email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return prisma.projectMember.create({
      data: {
        projectId,
        userId: user.id,
        role: "COLLABORATOR"
      }
    });
  }
}
