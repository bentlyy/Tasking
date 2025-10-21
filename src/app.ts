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

// ✅ Healthcheck (para Railway)
app.get("/health", (_req, res) => res.send("ok"));

// ✅ Redirección automática del root → Swagger UI
app.get("/", (_req, res) => {
  res.redirect("/api/docs");
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

// ✅ API principal
app.use("/api", routes);

// ✅ Middleware de errores
app.use(errorMiddleware);

export default app;
