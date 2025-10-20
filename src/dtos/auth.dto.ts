import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "El password debe tener al menos 6 caracteres")
});

export type RegisterDTO = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "El password debe tener al menos 6 caracteres")
});

export type LoginDTO = z.infer<typeof loginSchema>;
