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

// Protegemos todas las rutas con JWT
router.use(authMiddleware);

// Crear tarea (solo OWNER, con validación)
router.post(
  "/",
  isProjectOwner,
  validate(createTaskSchema),
  TaskController.create
);

// Listar tareas por proyecto (OWNER o COLLAB)
router.get(
  "/by-project/:projectId",
  TaskController.getByProject
);

// Actualizar contenido de tarea (solo OWNER)
router.put(
  "/:id",
  isProjectOwner,
  validate(updateTaskSchema),
  TaskController.update
);

// Cambiar estado (solo OWNER)
router.put(
  "/:id/status",
  isProjectOwner,
  validate(changeStatusSchema),
  TaskController.changeStatus
);

// Asignar usuario (solo OWNER)
router.put(
  "/:id/assign",
  isProjectOwner,
  validate(assignTaskSchema),
  TaskController.assignUser
);

// Eliminar tarea (solo OWNER)
router.delete("/:id", isProjectOwner, TaskController.delete);

export default router;
