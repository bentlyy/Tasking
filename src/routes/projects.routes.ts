/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Gestión de proyectos
 */

import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isProjectOwner } from "../middlewares/project.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createProjectSchema, updateProjectSchema } from "../dtos/project.dto";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Crear un proyecto
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", validate(createProjectSchema), ProjectController.create);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Listar proyectos del usuario
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 */
router.get("/", ProjectController.getAll);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Obtener proyecto por ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", ProjectController.getById);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Actualizar un proyecto
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", isProjectOwner, validate(updateProjectSchema), ProjectController.update);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Eliminar proyecto
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", isProjectOwner, ProjectController.delete);

/**
 * @swagger
 * /projects/{id}/members:
 *   post:
 *     summary: Agregar miembro
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 */
router.post("/:id/members", isProjectOwner, ProjectController.addMember);

export default router;
