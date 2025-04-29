import apiClient from './api-client';
import { getDatabase } from '../config/database';
import { Collection, Document, ObjectId } from 'mongodb';

/**
 * Helper function to fetch data from API with MongoDB fallback
 * @param endpoint - API endpoint to fetch from
 * @param collectionName - MongoDB collection name for fallback
 * @param params - Optional query parameters
 * @returns Promise with the data
 */
export async function fetchWithFallback<T>(
  endpoint: string, 
  collectionName: string, 
  params?: Record<string, any>
): Promise<T[]> {
  try {
    // Try to fetch from API first
    const response = await apiClient.get(endpoint, { params });
    return response.data.data || response.data;
  } catch (error) {
    console.warn(`API request failed for ${endpoint}, falling back to MongoDB`, error);
    
    // Fall back to MongoDB if API fails
    const db = getDatabase();
    if (!db) {
      throw new Error('Database not connected');
    }
    
    const collection: Collection<Document> = db.collection(collectionName);
    const documents = await collection.find({}).toArray();
    
    return documents as unknown as T[];
  }
}

/**
 * Helper function to create data with API and MongoDB sync
 * @param endpoint - API endpoint to post to
 * @param collectionName - MongoDB collection name for sync
 * @param data - Data to create
 * @returns Promise with the created data
 */
export async function createWithSync<T>(
  endpoint: string, 
  collectionName: string, 
  data: any
): Promise<T> {
  try {
    // Create via API
    const response = await apiClient.post(endpoint, data);
    const createdData = response.data.data || response.data;
    
    // Sync with MongoDB
    const db = getDatabase();
    if (db) {
      const collection: Collection<Document> = db.collection(collectionName);
      await collection.insertOne(createdData);
    }
    
    return createdData;
  } catch (error) {
    console.error(`Failed to create data at ${endpoint}`, error);
    throw error;
  }
}

/**
 * Helper function to update data with API and MongoDB sync
 * @param endpoint - API endpoint to update
 * @param collectionName - MongoDB collection name for sync
 * @param id - ID of the document to update
 * @param data - Data to update
 * @returns Promise with the updated data
 */
export async function updateWithSync<T>(
  endpoint: string, 
  collectionName: string, 
  id: string, 
  data: any
): Promise<T> {
  try {
    // Update via API
    const response = await apiClient.put(`${endpoint}/${id}`, data);
    const updatedData = response.data.data || response.data;
    
    // Sync with MongoDB
    const db = getDatabase();
    if (db) {
      const collection: Collection<Document> = db.collection(collectionName);
      await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
    }
    
    return updatedData;
  } catch (error) {
    console.error(`Failed to update data at ${endpoint}/${id}`, error);
    throw error;
  }
}

/**
 * Helper function to delete data with API and MongoDB sync
 * @param endpoint - API endpoint to delete from
 * @param collectionName - MongoDB collection name for sync
 * @param id - ID of the document to delete
 * @returns Promise with success status
 */
export async function deleteWithSync(
  endpoint: string, 
  collectionName: string, 
  id: string
): Promise<boolean> {
  try {
    // Delete via API
    const response = await apiClient.delete(`${endpoint}/${id}`);
    
    // Sync with MongoDB
    const db = getDatabase();
    if (db) {
      const collection: Collection<Document> = db.collection(collectionName);
      await collection.deleteOne({ _id: new ObjectId(id) });
    }
    
    return true;
  } catch (error) {
    console.error(`Failed to delete data at ${endpoint}/${id}`, error);
    throw error;
  }
}
