import { Request, Response } from "express";
import { ProjectService } from "../services/project.service";
import { AuthRequest } from "../middlewares/auth.middleware";

const projectService = new ProjectService();

export class ProjectController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const { name, description } = req.body;
      const project = await projectService.create({
        name,
        description,
        ownerId: req.user!.id
      });
      res.status(201).json(project);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAll(req: AuthRequest, res: Response) {
    const projects = await projectService.getAll(req.user!.id);
    res.json(projects);
  }

  static async getById(req: AuthRequest, res: Response) {
    try {
      const projectId = Number(req.params.id);
      const project = await projectService.getById(projectId, req.user!.id);
      res.json(project);
    } catch (error: any) {
      res.status(403).json({ message: error.message });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    const projectId = Number(req.params.id);
    const { name, description } = req.body;
    const updated = await projectService.update(projectId, { name, description });
    res.json(updated);
  }

  static async delete(req: AuthRequest, res: Response) {
    const projectId = Number(req.params.id);
    await projectService.delete(projectId);
    res.json({ message: "Proyecto eliminado" });
  }

  static async addMember(req: AuthRequest, res: Response) {
    try {
      const projectId = Number(req.params.id);
      const { email } = req.body;
      const member = await projectService.addMember(projectId, email);
      res.status(201).json(member);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
