import { useState, useEffect, useCallback } from 'react';
import { ApiService } from './api-service';

/**
 * Custom hook for using API services in React components
 * @param service The API service instance
 * @returns Object with data, loading state, error state, and CRUD functions
 */
export function useApi<T>(service: ApiService<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load initial data
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch all data
  const fetchData = useCallback(async (params?: Record<string, any>) => {
    setLoading(true);
    try {
      const result = await service.getAll(params);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [service]);

  // Get a single item by ID
  const getById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const result = await service.getById(id);
      setError(null);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.error(`Error getting item with ID ${id}:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [service]);

  // Create a new item
  const create = useCallback(async (itemData: Partial<T>) => {
    setLoading(true);
    try {
      const result = await service.create(itemData);
      if (result) {
        setData(prev => [...prev, result]);
      }
      setError(null);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.error('Error creating item:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [service]);

  // Update an existing item
  const update = useCallback(async (id: string, itemData: Partial<T>) => {
    setLoading(true);
    try {
      const result = await service.update(id, itemData);
      if (result) {
        setData(prev => prev.map(item => (item as any)._id === id ? result : item));
      }
      setError(null);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.error(`Error updating item with ID ${id}:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [service]);

  // Delete an item
  const remove = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const success = await service.delete(id);
      if (success) {
        setData(prev => prev.filter(item => (item as any)._id !== id));
      }
      setError(null);
      return success;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.error(`Error deleting item with ID ${id}:`, err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [service]);

  // Search for items
  const search = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const results = await service.search(query);
      setError(null);
      return results;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.error(`Error searching with query "${query}":`, err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [service]);

  return {
    data,
    loading,
    error,
    fetchData,
    getById,
    create,
    update,
    remove,
    search
  };
}

export default useApi;
