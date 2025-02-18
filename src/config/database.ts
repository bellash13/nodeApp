import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { config } from ".";

dotenv.config();

const sequelize = new Sequelize(
   config.DB_NAME,
 config.DB_USER || "postgres",
 config.DB_PASS || "postgres",
  {
    host:config.DB_HOST || "localhost",
    port: config.DB_PORT,
    dialect: "postgres",
    logging:config.NODE_ENV === "development" ? console.log : false,
  }
);

export default sequelize;
