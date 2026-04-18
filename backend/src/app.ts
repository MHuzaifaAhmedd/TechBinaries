import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { getDb } from "./config/database";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  try {
    const db = await getDb();
    await db.command({ ping: 1 });

    return res.status(200).json({
      ok: true,
      message: "API and MongoDB are reachable",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Healthcheck failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.get("/", (_req, res) => {
  res.status(200).json({
    app: "Company Website API",
    status: "running",
  });
});
