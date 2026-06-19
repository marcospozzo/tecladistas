// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

declare global {
  namespace globalThis {
    var _mongoClientPromise: Promise<MongoClient>;
  }
}

const uri = process.env.MONGODB_URI;
const options = {
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000,
  maxIdleTimeMS: 270000,
  minPoolSize: 1,
  maxPoolSize: 4,
};

async function connectWithRetry(attempt = 0): Promise<MongoClient> {
  try {
    const client = new MongoClient(uri, options);
    return await client.connect();
  } catch (error) {
    if (attempt < 2) {
      console.log(`MongoDB connection failed. Retrying (attempt ${attempt + 1})...`);
      await new Promise((r) => setTimeout(r, 500));
      return connectWithRetry(attempt + 1);
    }
    throw error;
  }
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = connectWithRetry();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = connectWithRetry();
}

export default clientPromise;
