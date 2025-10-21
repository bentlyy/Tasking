import { z } from "zod";

export const createTaskSchema = z.object({
  body: z.object({
    projectId: z.number().or(z.string().transform(Number)),
    title: z.string().min(1, "El título es obligatorio"),
    description: z.string().optional(),
  }),
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const changeStatusSchema = z.object({
  body: z.object({
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
  }),
});

export const assignTaskSchema = z.object({
  body: z.object({
    userId: z.number().or(z.string().transform(Number)),
  }),
});
