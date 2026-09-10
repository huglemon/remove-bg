import { MongoClient } from "mongodb";

const globalForMongo = globalThis;

if (!globalForMongo.mongoClient) {
  globalForMongo.mongoClient = new MongoClient(process.env.MONGODB_URI);
  globalForMongo.mongoClient.on("close", () => {
    globalForMongo.mongoConnectionPromise = undefined;
  });
}

export const client = globalForMongo.mongoClient;
export const db = client.db(process.env.MONGODB_DB_NAME);

export async function connectToDatabase() {
  if (!globalForMongo.mongoConnectionPromise) {
    globalForMongo.mongoConnectionPromise = client.connect().catch((error) => {
      globalForMongo.mongoConnectionPromise = undefined;
      console.error("MongoDB connection failed:", {
        name: error.name,
        message: error.message,
        cause: error.cause?.message,
      });
      throw error;
    });
  }

  await globalForMongo.mongoConnectionPromise;
  return { client, db };
}
