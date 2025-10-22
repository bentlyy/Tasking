import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { AIService } from "../services/ai.service";

const ai = new AIService();

export class AIController {
  static async summarize(req: AuthRequest, res: Response) {
    const { text, length } = req.body;
    const data = await ai.summarize({ text, length });
    res.json(data);
  }

  static async subtasks(req: AuthRequest, res: Response) {
    const { task, count } = req.body;
    const data = await ai.subtasks({ task, count });
    res.json(data);
  }

  static async prioritize(req: AuthRequest, res: Response) {
    const projectId = Number(req.params.projectId);
    const data = await ai.prioritizeProject(projectId);
    res.json(data);
  }
}