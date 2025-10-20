import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isProjectOwner } from "../middlewares/project.middleware";

const router = Router();

// Todas las rutas de tasks requieren auth
router.use(authMiddleware);

router.post("/", isProjectOwner, TaskController.create);
router.get("/by-project/:projectId", TaskController.getByProject);
router.put("/:id", isProjectOwner, TaskController.update);
router.put("/:id/status", isProjectOwner, TaskController.changeStatus);
router.put("/:id/assign", isProjectOwner, TaskController.assignUser);
router.delete("/:id", isProjectOwner, TaskController.delete);

export default router;
