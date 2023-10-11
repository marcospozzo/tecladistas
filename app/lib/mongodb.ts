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
  maxIdleTimeMS: 270000,
  minPoolSize: 2,
  maxPoolSize: 4,
};

let client;
let clientPromise: Promise<MongoClient>;

const maxRetries = 3; // You can adjust the number of retries as needed
let currentRetries = 0;

function connectWithRetry(): Promise<MongoClient> {
  return clientPromise.catch((error) => {
    if (currentRetries < maxRetries) {
      currentRetries++;
      console.log(`Connection failed. Retrying (Attempt ${currentRetries})...`);
      return connectWithRetry(); // Recursive call to retry
    }
    throw error; // If max retries are reached, throw the error
  });
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    let client = new MongoClient(uri, options);
    global._mongoClientPromise = connectWithRetry(); // Retry logic added here
  }
  clientPromise = global._mongoClientPromise;
} else {
  let client = new MongoClient(uri, options);
  clientPromise = connectWithRetry(); // Retry logic added here
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
