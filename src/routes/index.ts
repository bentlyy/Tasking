import { Router } from "express";
import authRoutes from "./auth.routes";
import projectsRoutes from "./projects.routes";
import tasksRoutes from "./tasks.routes";
import dashboardRoutes from "./dashboard.routes";

const router = Router();

// Definir las rutas de la API

router.use("/auth", authRoutes);
router.use("/projects", projectsRoutes);
router.use("/tasks", tasksRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
