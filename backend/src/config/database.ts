import { MongoClient } from "mongodb";
import { env } from "./env";

let client: MongoClient | null = null;

export const connectToDatabase = async (): Promise<MongoClient> => {
  if (client) {
    return client;
  }

  client = new MongoClient(env.mongoUri, {
    appName: "company-website-api",
    maxPoolSize: 10,
    minPoolSize: 1,
  });

  await client.connect();
  return client;
};

export const getDb = async () => {
  const mongoClient = await connectToDatabase();
  return mongoClient.db(env.mongoDbName);
};

export const closeDatabaseConnection = async (): Promise<void> => {
  if (client) {
    await client.close();
    client = null;
  }
};
