import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isProjectOwner } from "../middlewares/authorization.middleware";

const router = Router();

// Rutas protegidas con JWT
router.use(authMiddleware);

router.post("/", ProjectController.create);
router.get("/", ProjectController.getAll);
router.get("/:id", ProjectController.getById);

// Solo OWNER puede editar o eliminar
router.put("/:id", isProjectOwner, ProjectController.update);
router.delete("/:id", isProjectOwner, ProjectController.delete);

// Agregar miembros
router.post("/:id/members", isProjectOwner, ProjectController.addMember);

export default router;
