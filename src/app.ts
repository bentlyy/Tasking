import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./config/swagger";

const app = express();
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(morgan("dev"));

// ✅ Ruta raíz ANTES del error middleware
app.get("/", (_req, res) => {
  res.json({ message: "Task Management API 🚀" });
});

// ✅ Swagger JSON
app.get("/api/docs.json", (_req, res) => {
  res.json(swaggerSpec);
});

// ✅ Swagger UI
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      url: "/api/docs.json",
    },
  })
);

// ✅ Rutas de la API
app.use("/api", routes);

// ✅ Middleware de errores (siempre último)
app.use(errorMiddleware);

export default app;
