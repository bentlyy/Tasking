export type AISummarizeInput = {
  text: string;
  length?: "short" | "medium" | "long";
};

export type AISubtasksInput = {
  task: string;
  count?: number;
};

export type AIPrioritizeInput = {
  tasks: { id: number; title: string; description?: string | null }[];
};

export interface AIClient {
  summarize(input: AISummarizeInput): Promise<{ summary: string }>;
  generateSubtasks(input: AISubtasksInput): Promise<{ subtasks: string[] }>;
  prioritize(input: AIPrioritizeInput): Promise<
    { id: number; priority: "HIGH" | "MEDIUM" | "LOW"; reason: string }[]
  >;
}

/**
 * Implementación MOCK (sin costo). Respuestas realistas.
 * Más adelante puedes:
 *  - crear OpenAIClient que implemente AIClient,
 *  - leer OPENAI_API_KEY desde env,
 *  - y reemplazar la exportación por el real.
 */
export class MockAIClient implements AIClient {
  async summarize(input: AISummarizeInput): Promise<{ summary: string }> {
    const { text, length = "short" } = input;
    const limit = length === "short" ? 24 : length === "medium" ? 48 : 96;
    const base =
      "Resumen: " +
      "Esta tarea apunta a ejecutar el objetivo principal con pasos claros, " +
      "considerando riesgos básicos y entregables verificables.";
    const trimmed = base.slice(0, limit);
    return {
      summary:
        trimmed +
        (trimmed.endsWith(".") ? "" : "...") +
        " Ejemplo del contenido: " +
        (text.length > 60 ? text.slice(0, 60) + "..." : text),
    };
  }

  async generateSubtasks(input: AISubtasksInput): Promise<{ subtasks: string[] }> {
    const { task, count = 4 } = input;
    const ideas = [
      `Definir alcance de "${task}"`,
      `Diseñar estructura técnica para "${task}"`,
      `Implementar funcionalidad base de "${task}"`,
      `Escribir pruebas iniciales de "${task}"`,
      `Revisar seguridad y edge cases de "${task}"`,
      `Documentar decisiones y uso de "${task}"`,
      `Preparar despliegue y checklist de "${task}"`,
    ];
    return { subtasks: ideas.slice(0, Math.min(count, ideas.length)) };
  }

  async prioritize(input: AIPrioritizeInput): Promise<
    { id: number; priority: "HIGH" | "MEDIUM" | "LOW"; reason: string }[]
  > {
    // Heurística MOCK: títulos con "fix", "security", "deploy" => HIGH
    // "refactor", "docs" => MEDIUM, otro => LOW
    return input.tasks.map((t) => {
      const txt = `${t.title} ${t.description ?? ""}`.toLowerCase();
      let priority: "HIGH" | "MEDIUM" | "LOW" = "LOW";
      let reason = "No se detectan riesgos inmediatos.";

      if (/(security|vuln|securidad|auth|jwt|cred)/.test(txt)) {
        priority = "HIGH";
        reason = "Relacionada a seguridad o autenticación.";
      } else if (/(fix|bug|error|crash)/.test(txt)) {
        priority = "HIGH";
        reason = "Corregir errores críticos primero.";
      } else if (/(deploy|release|ci\/cd|pipeline)/.test(txt)) {
        priority = "HIGH";
        reason = "Afecta el flujo de entrega y releases.";
      } else if (/(refactor|optimi|performance)/.test(txt)) {
        priority = "MEDIUM";
        reason = "Mejora técnica sin urgencia inmediata.";
      } else if (/(docs|document|readme)/.test(txt)) {
        priority = "MEDIUM";
        reason = "Documentación importante, pero no bloqueante.";
      }

      return { id: t.id, priority, reason };
    });
  }
}

// Fábrica simple: por ahora siempre mock.
// Cuando actives un proveedor real, cambia aquí.
export function getAIClient(): AIClient {
  // Ejemplo futuro:
  // if (process.env.AI_PROVIDER === "openai") return new OpenAIAIClient();
  return new MockAIClient();
}