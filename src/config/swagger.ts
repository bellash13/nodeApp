import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express, Request, Response } from "express";
import { config } from ".";
import { loginValidation, registerValidation } from "../validations/auth.validation";
import joiToSwagger from "joi-to-swagger";

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
        Auth_Register: joiToSwagger(registerValidation).swagger,
        Auth_Login: joiToSwagger(loginValidation).swagger,
      },
    },
    servers: [{ url: `http://localhost:${config.PORT}/${config.VERSION}` }],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.get("/swagger.json", (req: Request, res: Response) => {
    res.json(swaggerSpec);
  });
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec,{explorer: true}));
  console.log(`Documentation at http://localhost:${config.PORT}`);
};
