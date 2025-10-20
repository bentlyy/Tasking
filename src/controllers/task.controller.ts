import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { TaskService } from "../services/task.service";

const taskService = new TaskService();

export class TaskController {
  static async create(req: AuthRequest, res: Response, next: NextFunction) {
    taskService.create(req.user!.id, req.body.projectId, req.body.title, req.body.description)
      .then(task => res.status(201).json(task))
      .catch(next);
  }

  static async getByProject(req: AuthRequest, res: Response, next: NextFunction) {
    taskService.getByProject(Number(req.params.projectId), req.user!.id)
      .then(tasks => res.json(tasks))
      .catch(next);
  }

  static async update(req: AuthRequest, res: Response, next: NextFunction) {
    taskService.update(Number(req.params.id), req.body)
      .then(task => res.json(task))
      .catch(next);
  }

  static async changeStatus(req: AuthRequest, res: Response, next: NextFunction) {
    taskService.changeStatus(Number(req.params.id), req.body.status)
      .then(task => res.json(task))
      .catch(next);
  }

  static async assignUser(req: AuthRequest, res: Response, next: NextFunction) {
    taskService.assignUser(Number(req.params.id), req.body.userId)
      .then(task => res.json(task))
      .catch(next);
  }

  static async delete(req: AuthRequest, res: Response, next: NextFunction) {
    taskService.delete(Number(req.params.id))
      .then(() => res.json({ message: "Tarea eliminada" }))
      .catch(next);
  }
}
