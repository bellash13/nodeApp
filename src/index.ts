import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { setupSwagger } from "./config/swagger";
import sequelize from "./config/database";
import middleware from "i18next-http-middleware";
import i18next from "./middleware/i18n.middleware";
import homeRoutes from "./routes/home.routes";
import { config } from "./config";
import roleRoutes from "./routes/role.routes";

const app = express();
const startServer = async () => {
    try {
        // Ensure i18next is initialized before using it in middleware
        await i18next.init();
        console.log("🌍 i18next initialized successfully");


        app.use(express.json());
        app.use(cors());
        app.use(middleware.handle(i18next));

        // Setup Swagger Documentation
        setupSwagger(app);

        // API Routes
        app.use("/", homeRoutes);
        app.use(`/${config.VERSION}`, homeRoutes);
        app.use(`/${config.VERSION}/auth`, authRoutes);
        app.use(`/${config.VERSION}/roles`, roleRoutes);

        // Sync database
        await sequelize.sync({ alter: true });
        console.log(i18next.t("database.synced"));
 
        app.listen(config.PORT, () => console.log(`${i18next.t('server.started', { port: config.PORT })}`));
    } catch (error) {
        console.error(`${i18next.t('server.error')}`, error);
    }
};

// Start the server
startServer();
