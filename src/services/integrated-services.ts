import apiClient from './api-client';
import DBService from './db-service';
import { getDatabase } from '../config/database';
import { WithId } from 'mongodb';

// Generic interfaces for API responses
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface PaginatedApiResponse<T> {
  success: boolean;
  data: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  message?: string;
}

/**
 * Integrated service that combines API calls with direct MongoDB access
 * This provides a fallback mechanism if the API is unavailable
 */
export class IntegratedService<T extends { _id: string }> {
  private apiEndpoint: string;
  private collectionName: string;
  private dbService: DBService<T>;

  constructor(apiEndpoint: string, collectionName: string) {
    this.apiEndpoint = apiEndpoint;
    this.collectionName = collectionName;
    this.dbService = new DBService<T>(collectionName);
  }

  /**
   * Get all items from the API or fallback to MongoDB
   * @param params Optional query parameters
   * @returns Array of items
   */
  async getAll(params?: Record<string, any>): Promise<(T | WithId<T>)[]> {
    try {
      // Try API first
      const response = await apiClient.get<ApiResponse<T[]> | PaginatedApiResponse<T>>(
        this.apiEndpoint,
        { params }
      );
      
      // Handle different response formats
      if ('data' in response.data) {
        return Array.isArray(response.data.data) ? response.data.data : [response.data.data];
      }
      return [];
    } catch (error) {
      console.warn(`API request failed for ${this.apiEndpoint}, falling back to MongoDB`, error);
      
      // Fallback to MongoDB
      return this.dbService.findAll(params || {});
    }
  }

  /**
   * Get an item by ID from the API or fallback to MongoDB
   * @param id Item ID
   * @returns Item or null if not found
   */
  async getById(id: string): Promise<T | WithId<T> | null> {
    try {
      // Try API first
      const response = await apiClient.get<ApiResponse<T>>(`${this.apiEndpoint}/${id}`);
      return response.data.data;
    } catch (error) {
      console.warn(`API request failed for ${this.apiEndpoint}/${id}, falling back to MongoDB`, error);
      
      // Fallback to MongoDB
      return this.dbService.findById(id);
    }
  }

  /**
   * Create a new item via API and sync with MongoDB
   * @param data Item data
   * @returns Created item or null if failed
   */
  async create(data: Partial<T>): Promise<T | WithId<T> | null> {
    try {
      // Create via API
      const response = await apiClient.post<ApiResponse<T>>(this.apiEndpoint, data);
      const createdItem = response.data.data;
      
      // Sync with MongoDB
      const db = getDatabase();
      if (db) {
        await this.dbService.insertOne(createdItem);
      }
      
      return createdItem;
    } catch (error) {
      console.error(`Failed to create item at ${this.apiEndpoint}`, error);
      
      // Try to create directly in MongoDB as fallback
      return this.dbService.insertOne(data);
    }
  }

  /**
   * Update an item via API and sync with MongoDB
   * @param id Item ID
   * @param data Update data
   * @returns Updated item or null if failed
   */
  async update(id: string, data: Partial<T>): Promise<T | WithId<T> | null> {
    try {
      // Update via API
      const response = await apiClient.put<ApiResponse<T>>(`${this.apiEndpoint}/${id}`, data);
      const updatedItem = response.data.data;
      
      // Sync with MongoDB
      const db = getDatabase();
      if (db) {
        await this.dbService.updateById(id, updatedItem);
      }
      
      return updatedItem;
    } catch (error) {
      console.error(`Failed to update item at ${this.apiEndpoint}/${id}`, error);
      
      // Try to update directly in MongoDB as fallback
      return this.dbService.updateById(id, data);
    }
  }

  /**
   * Delete an item via API and sync with MongoDB
   * @param id Item ID
   * @returns True if successful, false otherwise
   */
  async delete(id: string): Promise<boolean> {
    try {
      // Delete via API
      await apiClient.delete(`${this.apiEndpoint}/${id}`);
      
      // Sync with MongoDB
      const db = getDatabase();
      if (db) {
        await this.dbService.deleteById(id);
      }
      
      return true;
    } catch (error) {
      console.error(`Failed to delete item at ${this.apiEndpoint}/${id}`, error);
      
      // Try to delete directly in MongoDB as fallback
      return this.dbService.deleteById(id);
    }
  }

  /**
   * Search for items via API or fallback to MongoDB
   * @param query Search query
   * @returns Array of matching items
   */
  async search(query: string): Promise<(T | WithId<T>)[]> {
    try {
      // Try API first
      const response = await apiClient.get<ApiResponse<T[]>>(
        `${this.apiEndpoint}/search`,
        { params: { q: query } }
      );
      return response.data.data;
    } catch (error) {
      console.warn(`API search request failed for ${this.apiEndpoint}, falling back to MongoDB`, error);
      
      // Fallback to MongoDB - basic text search
      // This is a simplified approach; MongoDB text search would be more powerful
      const allItems = await this.dbService.findAll();
      return allItems.filter(item => 
        Object.values(item).some(value => 
          typeof value === 'string' && value.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }
}

// Create service instances for each API endpoint
export const productService = new IntegratedService<any>('/product', 'products');
export const userService = new IntegratedService<any>('/user', 'users');
export const orderService = new IntegratedService<any>('/order', 'orders');
export const cartService = new IntegratedService<any>('/cart', 'carts');
export const categoryService = new IntegratedService<any>('/categories', 'categories');

// Export all services
export default {
  product: productService,
  user: userService,
  order: orderService,
  cart: cartService,
  category: categoryService
};
