import { connectDB, getDB } from '../services/mongodb';
import type { Db } from 'mongodb';

/**
 * Initialize the database connection
 * @returns Promise<Db> - MongoDB database instance
 */
export const initDatabase = async (): Promise<Db> => {
  try {
    const db = await connectDB();
    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

/**
 * Get the current database instance
 * @returns Db | null - MongoDB database instance or null if not connected
 */
export const getDatabase = (): Db | null => {
  return getDB();
};

/**
 * Check if the database is connected
 * @returns boolean - True if connected, false otherwise
 */
export const isDatabaseConnected = (): boolean => {
  return getDB() !== null;
};
