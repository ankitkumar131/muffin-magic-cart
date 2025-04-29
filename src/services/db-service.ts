import { getDatabase } from '../config/database';
import { Collection, Document, ObjectId, WithId } from 'mongodb';

/**
 * Generic database service to interact with MongoDB collections
 */
class DBService<T extends Document> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  /**
   * Get the MongoDB collection
   * @returns Collection or null if database is not connected
   */
  private getCollection(): Collection<T> | null {
    const db = getDatabase();
    if (!db) {
      console.error('Database not connected');
      return null;
    }
    return db.collection<T>(this.collectionName);
  }

  /**
   * Find all documents in the collection
   * @param query Optional query filter
   * @returns Array of documents
   */
  async findAll(query: object = {}): Promise<WithId<T>[]> {
    const collection = this.getCollection();
    if (!collection) return [];
    
    try {
      return await collection.find(query).toArray();
    } catch (error) {
      console.error(`Error finding documents in ${this.collectionName}:`, error);
      return [];
    }
  }

  /**
   * Find a document by ID
   * @param id Document ID
   * @returns Document or null if not found
   */
  async findById(id: string): Promise<WithId<T> | null> {
    const collection = this.getCollection();
    if (!collection) return null;
    
    try {
      return await collection.findOne({ _id: new ObjectId(id) } as any);
    } catch (error) {
      console.error(`Error finding document by ID in ${this.collectionName}:`, error);
      return null;
    }
  }

  /**
   * Find documents by a field value
   * @param field Field name
   * @param value Field value
   * @returns Array of matching documents
   */
  async findByField(field: string, value: any): Promise<WithId<T>[]> {
    const collection = this.getCollection();
    if (!collection) return [];
    
    try {
      const query: any = {};
      query[field] = value;
      return await collection.find(query).toArray();
    } catch (error) {
      console.error(`Error finding documents by field in ${this.collectionName}:`, error);
      return [];
    }
  }

  /**
   * Insert a new document
   * @param data Document data
   * @returns Inserted document or null if failed
   */
  async insertOne(data: Partial<T>): Promise<WithId<T> | null> {
    const collection = this.getCollection();
    if (!collection) return null;
    
    try {
      const result = await collection.insertOne(data as any);
      if (result.acknowledged) {
        return this.findById(result.insertedId.toString());
      }
      return null;
    } catch (error) {
      console.error(`Error inserting document in ${this.collectionName}:`, error);
      return null;
    }
  }

  /**
   * Update a document by ID
   * @param id Document ID
   * @param data Update data
   * @returns Updated document or null if failed
   */
  async updateById(id: string, data: Partial<T>): Promise<WithId<T> | null> {
    const collection = this.getCollection();
    if (!collection) return null;
    
    try {
      const result = await collection.updateOne(
        { _id: new ObjectId(id) } as any,
        { $set: data }
      );
      
      if (result.acknowledged) {
        return this.findById(id);
      }
      return null;
    } catch (error) {
      console.error(`Error updating document in ${this.collectionName}:`, error);
      return null;
    }
  }

  /**
   * Delete a document by ID
   * @param id Document ID
   * @returns True if successful, false otherwise
   */
  async deleteById(id: string): Promise<boolean> {
    const collection = this.getCollection();
    if (!collection) return false;
    
    try {
      const result = await collection.deleteOne({ _id: new ObjectId(id) } as any);
      return result.acknowledged && result.deletedCount > 0;
    } catch (error) {
      console.error(`Error deleting document in ${this.collectionName}:`, error);
      return false;
    }
  }
}

export default DBService;
