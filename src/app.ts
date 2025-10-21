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
    crossOriginEmbedderPolicy: false, // ✅ Necesario para Swagger
  })
);
app.use(morgan("dev"));

// ✅ JSON de la documentación
app.get("/api/docs.json", (_req, res) => {
  res.json(swaggerSpec);
});

// ✅ UI de Swagger (le decimos dónde está el JSON)
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      url: "/api/docs.json", // ✅ Especificamos el JSON
    },
  })
);

// ✅ Rutas protegidas de la API
app.use("/api", routes);

// ✅ Middleware de errores (siempre al final)
app.use(errorMiddleware);

// ✅ Ruta raíz de prueba
app.get("/", (_req, res) => {
  res.json({ message: "Task Management API 🚀" });
});

export default app;
