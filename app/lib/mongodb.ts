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
  connectTimeoutMS: 0,
  serverSelectionTimeoutMS: 0,
  frutanga: 0,
  maxIdleTimeMS: 270000,
  minPoolSize: 2,
  maxPoolSize: 4,
};

const maxRetries = 3; // You can adjust the number of retries as needed
let currentRetries = 0;
let clientPromise: Promise<MongoClient> | undefined;

async function connectWithRetry(): Promise<MongoClient> {
  if (!clientPromise) {
    if (process.env.NODE_ENV === "development") {
      // In development mode, use a global variable
      if (!global._mongoClientPromise) {
        const client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
      }
      clientPromise = global._mongoClientPromise;
    } else {
      // In production mode, create a new client
      const client = new MongoClient(uri, options);
      clientPromise = client.connect();
    }
  }

  return await clientPromise
    .then((client) => {
      return client; // Resolve with the client if successful
    })
    .catch(async (error) => {
      if (currentRetries < maxRetries) {
        currentRetries++;
        console.log(
          `Connection failed. Retrying (Attempt ${currentRetries})...`
        );
        return connectWithRetry(); // Recursive call to retry
      }
      throw error; // If max retries are reached, throw the error
    });
}

// Usage:
connectWithRetry()
  .then((client) => {
    console.log("Connected to MongoDB successfully.");
    // You can use the 'client' here for database operations
  })
  .catch((error) => {
    console.error("Failed to connect after retries:", error);
  });

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
