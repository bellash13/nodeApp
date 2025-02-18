import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import { setupSwagger } from "./config/swagger";
import sequelize from "./config/database";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Setup Swagger Documentation
setupSwagger(app);

// API Routes
app.use("/auth", userRoutes);

// Sync database
sequelize.sync({ alter: true }).then(() => {
    console.log("Database Synced successfully");

    const PORT = process.env.PORT || 3030;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
