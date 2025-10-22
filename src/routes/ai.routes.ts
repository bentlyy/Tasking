/**
 * @swagger
 * tags:
 *   name: AI
 *   description: Endpoints con asistencia de IA (mock-ready)
 */

import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { AIController } from "../controllers/ai.controller";
import { summarizeSchema, subtasksSchema, prioritizeSchema } from "../dtos/ai.dto";

const router = Router();
router.use(authMiddleware);

/**
 * @swagger
 * /ai/summarize:
 *   post:
 *     summary: Generar un resumen corto de un texto (mock IA)
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Configurar CI/CD con pruebas y despliegue automático"
 *               length:
 *                 type: string
 *                 enum: [short, medium, long]
 *                 example: "short"
 *     responses:
 *       200:
 *         description: Resumen generado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 summary:
 *                   type: string
 *                   example: "Automatiza CI/CD con validaciones y deploy continuo."
 */
router.post("/summarize", validate(summarizeSchema), AIController.summarize);

/**
 * @swagger
 * /ai/subtasks:
 *   post:
 *     summary: Generar subtareas sugeridas para una tarea (mock IA)
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *                 example: "Implementar autenticación con JWT"
 *               count:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 10
 *                 example: 4
 *     responses:
 *       200:
 *         description: Lista de subtareas sugeridas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subtasks:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - "Crear endpoint /register"
 *                     - "Crear endpoint /login"
 *                     - "Generar token JWT"
 *                     - "Proteger rutas privadas"
 */
router.post("/subtasks", validate(subtasksSchema), AIController.subtasks);

/**
 * @swagger
 * /ai/prioritize/{projectId}:
 *   get:
 *     summary: Priorizar tareas de un proyecto (mock IA)
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 12
 *     responses:
 *       200:
 *         description: Tareas priorizadas con HIGH/MEDIUM/LOW
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projectId:
 *                   type: number
 *                 prioritized:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: number }
 *                       priority: { type: string, enum: [HIGH, MEDIUM, LOW] }
 *                       reason: { type: string }
 */
router.get("/prioritize/:projectId", validate(prioritizeSchema), AIController.prioritize);

export default router;