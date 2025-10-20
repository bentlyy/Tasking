import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { TaskService } from "../services/task.service";

const taskService = new TaskService();

export class TaskController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const { projectId, title, description } = req.body;
      const task = await taskService.create(req.user!.id, projectId, title, description);
      res.status(201).json(task);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getByProject(req: AuthRequest, res: Response) {
    try {
      const projectId = Number(req.params.projectId);
      const tasks = await taskService.getByProject(projectId, req.user!.id);
      res.json(tasks);
    } catch (error: any) {
      res.status(403).json({ message: error.message });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    const taskId = Number(req.params.id);
    const { title, description } = req.body;
    const task = await taskService.update(taskId, { title, description });
    res.json(task);
  }

  static async changeStatus(req: AuthRequest, res: Response) {
    const taskId = Number(req.params.id);
    const { status } = req.body;
    const task = await taskService.changeStatus(taskId, status);
    res.json(task);
  }

  static async assignUser(req: AuthRequest, res: Response) {
    const taskId = Number(req.params.id);
    const { userId } = req.body;
    const task = await taskService.assignUser(taskId, userId);
    res.json(task);
  }

  static async delete(req: AuthRequest, res: Response) {
    const taskId = Number(req.params.id);
    await taskService.delete(taskId);
    res.json({ message: "Tarea eliminada" });
  }
}
