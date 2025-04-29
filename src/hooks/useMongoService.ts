import { useState, useEffect } from 'react';
import { IntegratedService } from '../services/integrated-services';
import { isDatabaseConnected } from '../config/database';

/**
 * Custom hook to use the integrated services with MongoDB in React components
 * @param service The integrated service instance
 * @returns Object with data, loading state, error state, and CRUD functions
 */
export function useMongoService<T extends { _id: string }>(service: IntegratedService<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isConnected, setIsConnected] = useState(isDatabaseConnected());

  // Load initial data
  useEffect(() => {
    fetchData();
  }, []);

  // Check database connection status
  useEffect(() => {
    const checkConnection = () => {
      setIsConnected(isDatabaseConnected());
    };

    // Check connection status every 5 seconds
    const interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch all data
  const fetchData = async (params?: Record<string, any>) => {
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
  };

  // Get a single item by ID
  const getById = async (id: string) => {
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
  };

  // Create a new item
  const create = async (itemData: Partial<T>) => {
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
  };

  // Update an existing item
  const update = async (id: string, itemData: Partial<T>) => {
    setLoading(true);
    try {
      const result = await service.update(id, itemData);
      if (result) {
        setData(prev => prev.map(item => item._id === id ? result : item));
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
  };

  // Delete an item
  const remove = async (id: string) => {
    setLoading(true);
    try {
      const success = await service.delete(id);
      if (success) {
        setData(prev => prev.filter(item => item._id !== id));
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
  };

  // Search for items
  const search = async (query: string) => {
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
  };

  return {
    data,
    loading,
    error,
    isConnected,
    fetchData,
    getById,
    create,
    update,
    remove,
    search
  };
}

export default useMongoService;
