import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { setupSwagger } from "./config/swagger";
import sequelize from "./config/database";
import middleware from "i18next-http-middleware";
import i18next from "./middleware/i18n.middleware";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(middleware.handle(i18next));

// Setup Swagger Documentation
setupSwagger(app);

// API Routes
app.use("/auth", authRoutes);

// Sync database
sequelize.sync({ alter: true }).then(() => {
    console.log("✅ Database Synced successfully");

    const PORT = process.env.PORT || 3030;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
