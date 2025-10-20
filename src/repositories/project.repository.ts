import { prisma } from "../config/prisma";

export class ProjectRepository {
  static create(data: { name: string; description?: string; ownerId: number }) {
    return prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        ownerId: data.ownerId,
        members: {
          create: { userId: data.ownerId, role: "OWNER" }
        }
      }
    });
  }

  static getAllForUser(userId: number) {
    return prisma.projectMember.findMany({
      where: { userId },
      include: { project: true }
    });
  }

  static getById(projectId: number) {
    return prisma.project.findUnique({
      where: { id: projectId },
      include: { members: true, tasks: true }
    });
  }
}
