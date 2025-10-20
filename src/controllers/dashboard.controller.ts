import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { DashboardService } from "../services/dashboard.service";

const dashboardService = new DashboardService();

export class DashboardController {
  static async getStats(req: AuthRequest, res: Response, next: NextFunction) {
    dashboardService.getStats(req.user!.id)
      .then(stats => res.json(stats))
      .catch(next);
  }
}
