"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const user_validation_1 = require("../validations/user.validation");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "CRUD API with Sequelize, JWT, and RBAC",
            version: "1.0.0",
            description: "API documentation with validation using Joi",
        },
        components: {
            schemas: {
                User: user_validation_1.userSwaggerSchema,
            },
        },
        servers: [{ url: `http://localhost:${process.env.PORT}` }],
    },
    apis: ["./src/routes/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    console.log(`Documentation at http://localhost:${process.env.PORT}`);
};
exports.setupSwagger = setupSwagger;
