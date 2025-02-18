
import dotenv from "dotenv";

dotenv.config();

export const config = {
    VERSION: process.env.VERSION || 'v1',
    PORT: process.env.PORT || 3030,
    DB_NAME: process.env.DB_NAME || "crud_db",
    DB_USER: process.env.DB_USER || "postgres",
    DB_PASS: process.env.DB_PASS || "postgres",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: Number(process.env.DB_PORT) || 5432,
    NODE_ENV: process.env.NODE_ENV,
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    JWT_SECRET: process.env.JWT_SECRET|| "secret",
    DEFAULT_LOCALE: process.env.DEFAULT_LOCALE||'es'
};
