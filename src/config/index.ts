// This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';

type ServerConfig = {
    PORT: number
    NODE_ENV: string
    DEV_DB_URI: string
    PROD_DB_URI: string
}

function loadEnv() {
    dotenv.config();
    console.log(`Environment variables loaded`);
}

loadEnv();

export const serverConfig: ServerConfig = {
    PORT: Number(process.env.PORT) || 3001,
    NODE_ENV: process.env.NODE_ENV || "development",
    DEV_DB_URI: process.env.DEV_DB_URI || "",
    PROD_DB_URI: process.env.PROD_DB_URI || ""
};