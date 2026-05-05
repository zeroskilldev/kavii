import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
});

console.log("DATABASE_URL:", process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in .env");
}

const connectionString = process.env.DATABASE_URL;

export const client = new PrismaClient({
  adapter: new PrismaPg({
    connectionString,
  }),
});