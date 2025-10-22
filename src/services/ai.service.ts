import { prisma } from "../config/prisma";
import { getAIClient } from "../config/aiClient";
import { SummarizeDTO, SubtasksDTO } from "../dtos/ai.dto";

export class AIService {
  private ai = getAIClient();

  async summarize({ text, length }: SummarizeDTO) {
    // Aquí podrías enriquecer con contexto (proyecto, etc.)
    const res = await this.ai.summarize({ text, length });
    return res; // { summary }
  }

  async subtasks({ task, count }: SubtasksDTO) {
    const res = await this.ai.generateSubtasks({ task, count });
    return res; // { subtasks: string[] }
  }

  async prioritizeProject(projectId: number) {
    // Obtenemos tareas del proyecto para pasarlas al "modelo"
    const tasks = await prisma.task.findMany({
      where: { projectId },
      select: { id: true, title: true, description: true },
      orderBy: { id: "asc" },
    });

    if (tasks.length === 0) {
      return { projectId, prioritized: [] as any[] };
    }

    const prioritized = await this.ai.prioritize({ tasks });
    return { projectId, prioritized };
  }
}