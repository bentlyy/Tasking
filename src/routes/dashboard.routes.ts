/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Estadísticas generales
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Obtener estadísticas del usuario
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 */

import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.get("/", authMiddleware, DashboardController.getStats);
export default router;
