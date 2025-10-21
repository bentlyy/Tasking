import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isProjectOwner } from "../middlewares/project.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../dtos/project.dto";

const router = Router();

// Protegemos todas las rutas con auth
router.use(authMiddleware);

// Crear proyecto (requiere validación de body)
router.post(
  "/",
  validate(createProjectSchema),
  ProjectController.create
);

// Listar proyectos
router.get("/", ProjectController.getAll);

// Obtener proyecto por id
router.get("/:id", ProjectController.getById);

// Actualizar proyecto (solo OWNER, con validación)
router.put(
  "//:id",
  isProjectOwner,
  validate(updateProjectSchema),
  ProjectController.update
);

// Eliminar proyecto (solo OWNER)
router.delete("/:id", isProjectOwner, ProjectController.delete);

// Agregar miembro a proyecto (solo OWNER)
router.post("/:id/members", isProjectOwner, ProjectController.addMember);

export default router;
