import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { AuthRequest } from "../middlewares/auth.middleware";

const authService = new AuthService();

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    authService.register(req.body)
      .then(result => res.status(201).json(result))
      .catch(next);
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    authService.login(req.body)
      .then(result => res.json(result))
      .catch(next);
  }

  static async profile(req: AuthRequest, res: Response) {
    return res.json({ userId: req.user?.id });
  }
}
