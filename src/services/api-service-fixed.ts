import apiClient from './api-client';

/**
 * Generic API service for handling all backend requests
 * This service follows the correct architecture by only communicating with the backend API
 * and not attempting to connect directly to MongoDB from the frontend
 */
export class ApiService<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Get all items
   * @param params Optional query parameters
   * @returns Promise with array of items
   */
  async getAll(params?: Record<string, any>): Promise<T[]> {
    try {
      // Adjust endpoint based on backend API structure
      const url = this.endpoint.includes('/all') ? this.endpoint : `${this.endpoint}/all`;
      const response = await apiClient.get<{ data: T[], success: boolean, message: string }>(
        url,
        { params }
      );
      return response.data.data || [];
    } catch (error) {
      console.error(`Error fetching data from ${this.endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Get item by ID
   * @param id Item ID
   * @returns Promise with item or null if not found
   */
  async getById(id: string): Promise<T | null> {
    try {
      const response = await apiClient.get<{ data: T, success: boolean, message: string }>(
        `${this.endpoint}/${id}`
      );
      return response.data.data || null;
    } catch (error) {
      console.error(`Error fetching item with ID ${id} from ${this.endpoint}:`, error);
      return null;
    }
  }

  /**
   * Create a new item
   * @param data Item data
   * @returns Promise with created item
   */
  async create(data: Partial<T>): Promise<T | null> {
    try {
      // Adjust endpoint based on backend API structure
      const url = this.endpoint.includes('/create') ? this.endpoint : `${this.endpoint}/create`;
      const response = await apiClient.post<{ data: T, success: boolean, message: string }>(
        url,
        data
      );
      return response.data.data || null;
    } catch (error) {
      console.error(`Error creating item at ${this.endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Update an existing item
   * @param id Item ID
   * @param data Update data
   * @returns Promise with updated item
   */
  async update(id: string, data: Partial<T>): Promise<T | null> {
    try {
      const response = await apiClient.put<{ data: T, success: boolean, message: string }>(
        `${this.endpoint}/${id}`,
        data
      );
      return response.data.data || null;
    } catch (error) {
      console.error(`Error updating item with ID ${id} at ${this.endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Delete an item
   * @param id Item ID
   * @returns Promise with success status
   */
  async delete(id: string): Promise<boolean> {
    try {
      const response = await apiClient.delete<{ success: boolean, message: string }>(
        `${this.endpoint}/${id}`
      );
      return response.data.success || false;
    } catch (error) {
      console.error(`Error deleting item with ID ${id} from ${this.endpoint}:`, error);
      return false;
    }
  }

  /**
   * Search for items
   * @param query Search query
   * @returns Promise with array of matching items
   */
  async search(query: string): Promise<T[]> {
    try {
      const response = await apiClient.get<{ data: T[], success: boolean, message: string }>(
        `${this.endpoint}/search`,
        { params: { q: query } }
      );
      return response.data.data || [];
    } catch (error) {
      console.error(`Error searching at ${this.endpoint} with query "${query}":`, error);
      return [];
    }
  }
}

// Create service instances for each API endpoint based on backend routes
export const productService = new ApiService<any>('/product');
export const userService = new ApiService<any>('/user');
export const orderService = new ApiService<any>('/order');
export const cartService = new ApiService<any>('/cart');
export const categoryService = new ApiService<any>('/categories');

// Export all services
export default {
  product: productService,
  user: userService,
  order: orderService,
  cart: cartService,
  category: categoryService
};
