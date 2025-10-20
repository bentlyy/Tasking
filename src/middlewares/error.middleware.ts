import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("ERROR:", err);

  const status = err.status || 400;
  const message = err.message || "Ha ocurrido un error inesperado";

  return res.status(status).json({
    status: "error",
    message,
  });
}
