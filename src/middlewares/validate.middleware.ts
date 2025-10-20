import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

export const validate =
  (schema: ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error: any) {
      return res.status(400).json({
        status: "error",
        message: "Validación fallida",
        issues: error.errors,
      });
    }
  };
