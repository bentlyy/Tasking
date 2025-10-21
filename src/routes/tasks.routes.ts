/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Gestión de tareas dentro de proyectos
 */

import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isProjectOwner } from "../middlewares/project.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  createTaskSchema,
  updateTaskSchema,
  changeStatusSchema,
  assignTaskSchema,
} from "../dtos/task.dto";

const router = Router();
router.use(authMiddleware);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear tarea
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", isProjectOwner, validate(createTaskSchema), TaskController.create);

/**
 * @swagger
 * /tasks/by-project/{projectId}:
 *   get:
 *     summary: Listar tareas por proyecto
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
router.get("/by-project/:projectId", TaskController.getByProject);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar tarea
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", isProjectOwner, validate(updateTaskSchema), TaskController.update);

/**
 * @swagger
 * /tasks/{id}/status:
 *   put:
 *     summary: Cambiar estado
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id/status", isProjectOwner, validate(changeStatusSchema), TaskController.changeStatus);

/**
 * @swagger
 * /tasks/{id}/assign:
 *   put:
 *     summary: Asignar usuario
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id/assign", isProjectOwner, validate(assignTaskSchema), TaskController.assignUser);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar tarea
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", isProjectOwner, TaskController.delete);

export default router;
