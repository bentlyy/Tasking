import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./config/swagger";

const app = express();
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api", routes);
app.use(errorMiddleware);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({ message: "Task Management API 🚀" });
});

export default app;
