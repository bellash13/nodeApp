import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express, Request, Response } from "express";
import { userSwaggerSchema } from "../validations/user.validation";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD API with Sequelize, JWT, and RBAC",
      version: "1.0.0",
      description: "API documentation with validation using Joi",
    },
    components: {
      schemas: {
        User: userSwaggerSchema,
      },
    },
    servers: [{ url: `http://localhost:${process.env.PORT}` }],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.get("/swagger.json", (req: Request, res: Response) => {
    res.json(swaggerSpec);
  });
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Documentation at http://localhost:${process.env.PORT}`);
};
