import { MongoClient, Db } from 'mongodb';

// Use environment variables with fallbacks
const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = import.meta.env.VITE_DB_NAME || 'muffin_magic_cart';

class MongoDBService {
  private static instance: MongoDBService;
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private isConnecting = false;

  private constructor() {}

  public static getInstance(): MongoDBService {
    if (!MongoDBService.instance) {
      MongoDBService.instance = new MongoDBService();
    }
    return MongoDBService.instance;
  }

  public async connect(): Promise<Db> {
    if (this.db) {
      return this.db;
    }

    if (this.isConnecting) {
      // Wait for the connection to be established
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (this.db) {
            clearInterval(checkInterval);
            resolve(this.db);
          }
        }, 100);
      });
    }

    try {
      this.isConnecting = true;
      this.client = new MongoClient(MONGODB_URI);
      await this.client.connect();
      this.db = this.client.db(DB_NAME);
      this.isConnecting = false;
      console.log('Connected to MongoDB successfully');
      return this.db;
    } catch (error) {
      this.isConnecting = false;
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  public getDb(): Db | null {
    return this.db;
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      console.log('Disconnected from MongoDB');
    }
  }
}

// Singleton instance
const mongoDBService = MongoDBService.getInstance();

// Connect to MongoDB
export const connectDB = async (): Promise<Db> => {
  return mongoDBService.connect();
};

// Get DB instance
export const getDB = (): Db | null => {
  return mongoDBService.getDb();
};

// Disconnect from MongoDB
export const disconnectDB = async (): Promise<void> => {
  return mongoDBService.disconnect();
};

// Handle application shutdown
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    disconnectDB().catch(console.error);
  });
}
