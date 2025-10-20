import { Response, NextFunction } from "express";
import { ProjectService } from "../services/project.service";
import { AuthRequest } from "../middlewares/auth.middleware";

const projectService = new ProjectService();

export class ProjectController {
  static async create(req: AuthRequest, res: Response, next: NextFunction) {
    projectService.create({ ...req.body, ownerId: req.user!.id })
      .then(project => res.status(201).json(project))
      .catch(next);
  }

  static async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    projectService.getAll(req.user!.id)
      .then(projects => res.json(projects))
      .catch(next);
  }

  static async getById(req: AuthRequest, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    projectService.getById(id, req.user!.id)
      .then(project => res.json(project))
      .catch(next);
  }

  static async update(req: AuthRequest, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    projectService.update(id, req.body)
      .then(updated => res.json(updated))
      .catch(next);
  }

  static async delete(req: AuthRequest, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    projectService.delete(id)
      .then(() => res.json({ message: "Proyecto eliminado" }))
      .catch(next);
  }

  static async addMember(req: AuthRequest, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    projectService.addMember(id, req.body.email)
      .then(member => res.status(201).json(member))
      .catch(next);
  }
}
