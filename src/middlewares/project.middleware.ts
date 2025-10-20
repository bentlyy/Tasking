import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "./auth.middleware";

export async function isProjectOwner(req: AuthRequest, res: Response, next: NextFunction) {
  const projectId = Number(req.params.id);
  const userId = req.user?.id;

  const member = await prisma.projectMember.findFirst({
    where: { projectId, userId, role: "OWNER" }
  });

  if (!member) {
    return res.status(403).json({ message: "No tienes permisos de OWNER en este proyecto" });
  }

  next();
}
