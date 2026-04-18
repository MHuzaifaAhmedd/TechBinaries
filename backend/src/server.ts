import { app } from "./app";
import { closeDatabaseConnection, connectToDatabase } from "./config/database";
import { env } from "./config/env";

const startServer = async () => {
  try {
    await connectToDatabase();
    console.log("MongoDB connected.");

    app.listen(env.port, () => {
      console.log(`Backend listening on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

const shutdown = async (signal: string) => {
  console.log(`${signal} received. Closing resources...`);
  await closeDatabaseConnection();
  process.exit(0);
};

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

void startServer();
