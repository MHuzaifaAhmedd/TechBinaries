import dotenv from "dotenv";

dotenv.config();

const portValue = Number(process.env.PORT ?? "5000");
const nodeEnv = process.env.NODE_ENV ?? "development";
const mongoUri = process.env.MONGODB_URI ?? "";
const mongoDbName = process.env.MONGODB_DB_NAME ?? "company_website";

if (!mongoUri) {
  throw new Error("MONGODB_URI is required. Add it to your backend .env file.");
}

export const env = {
  nodeEnv,
  port: Number.isNaN(portValue) ? 5000 : portValue,
  mongoUri,
  mongoDbName,
};
