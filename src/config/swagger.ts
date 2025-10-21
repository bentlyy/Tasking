import swaggerJsdoc from "swagger-jsdoc";

export const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "API para gestión de tareas",
    },
    servers: [
      {
        url: "http://localhost:3000/api", // Swagger usará este baseURL
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // ✅ Aquí Swagger buscará los @swagger tags
};
