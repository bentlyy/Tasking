import { z } from "zod";

export const summarizeSchema = z.object({
  text: z.string().min(1, "text es requerido"),
  length: z.enum(["short", "medium", "long"]).optional(),
});

export const subtasksSchema = z.object({
  task: z.string().min(1, "task es requerido"),
  count: z.number().int().min(1).max(10).optional(),
});

export const prioritizeSchema = z.object({
  projectId: z.number().int().min(1),
});

export type SummarizeDTO = z.infer<typeof summarizeSchema>;
export type SubtasksDTO = z.infer<typeof subtasksSchema>;
export type PrioritizeDTO = z.infer<typeof prioritizeSchema>;