
import { apiRequest } from "@/lib/api-client";
import { Product } from "@/types/product";

/**
 * API service for product-related operations
 */

export const productApi = {
  /**
   * Get all products
   */
  getProducts: async (params?: { category?: string; sort?: string }): Promise<Product[]> => {
    const searchParams = new URLSearchParams();
    if (params?.category && params.category !== 'all') {
      searchParams.append('category', params.category);
    }
    if (params?.sort) {
      searchParams.append('sort', params.sort);
    }

    const queryString = searchParams.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    
    // This is a temporary fallback to use local data while API is being set up
    try {
      return await apiRequest<Product[]>(endpoint);
    } catch (error) {
      console.log("API not yet implemented, using local data");
      const { getProductsByCategory, products } = await import('@/data/products');
      
      let result = params?.category && params.category !== 'all' 
        ? getProductsByCategory(params.category)
        : [...products];
        
      if (params?.sort) {
        switch (params.sort) {
          case "price-asc":
            result.sort((a, b) => a.price - b.price);
            break;
          case "price-desc":
            result.sort((a, b) => b.price - a.price);
            break;
          case "name-asc":
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case "name-desc":
            result.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case "featured":
          default:
            result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
            break;
        }
      }
      
      return result;
    }
  },

  /**
   * Get a single product by ID
   */
  getProductById: async (productId: string): Promise<Product | null> => {
    // This is a temporary fallback to use local data while API is being set up
    try {
      return await apiRequest<Product>(`/products/${productId}`);
    } catch (error) {
      console.log("API not yet implemented, using local data");
      const { getProductById } = await import('@/data/products');
      return getProductById(productId);
    }
  },

  /**
   * Get products by category
   */
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    return productApi.getProducts({ category });
  },

  /**
   * Get related products
   */
  getRelatedProducts: async (productId: string, limit: number = 4): Promise<Product[]> => {
    // This is a temporary fallback to use local data while API is being set up
    try {
      return await apiRequest<Product[]>(`/products/${productId}/related?limit=${limit}`);
    } catch (error) {
      console.log("API not yet implemented, using local data");
      const { getProductById, getProductsByCategory } = await import('@/data/products');
      const product = getProductById(productId);
      if (!product || !product.category.length) return [];
      
      return getProductsByCategory(product.category[0])
        .filter(p => p.id !== productId)
        .slice(0, limit);
    }
  }
};
