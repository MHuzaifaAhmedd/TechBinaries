import dotenv from "dotenv";

dotenv.config();

const readRequired = (name: string, missing: string[]): string => {
  const raw = process.env[name];
  if (typeof raw !== "string" || raw.trim() === "") {
    missing.push(name);
    return "";
  }
  return raw.trim();
};

const missing: string[] = [];
const mongoUri = readRequired("MONGODB_URI", missing);
const mongoDbName = readRequired("MONGODB_DB_NAME", missing);

if (missing.length > 0) {
  throw new Error(
    `Missing required environment variable(s): ${missing.join(", ")}. ` +
      "Set them in backend/.env for local development, or pass them via -e <NAME>=... " +
      "(or --env-file) in docker run for production."
  );
}

const portValue = Number(process.env.PORT ?? "5000");
const nodeEnv = process.env.NODE_ENV ?? "development";

export const env = {
  nodeEnv,
  port: Number.isNaN(portValue) ? 5000 : portValue,
  mongoUri,
  mongoDbName,
} as const;
