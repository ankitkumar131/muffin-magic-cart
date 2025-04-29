import apiClient from './api-client';
import { Product as ProductType } from '@/types/product';

// Backend Product interface
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
  ingredients?: string[];
  nutrition?: {
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
  };
  inStock: boolean;
}

// Convert backend product to frontend product type
const mapToProductType = (product: Product): ProductType => ({
  id: product._id,
  name: product.name,
  description: product.description,
  price: product.price,
  image: product.image,
  category: product.category.split(',') as any[], // Convert comma-separated string to array
  featured: product.featured || false,
  ingredients: product.ingredients,
  nutrition: product.nutrition
});

const productService = {
  getAllProducts: async () => {
    const response = await apiClient.get<{ data: Product[] }>('/product/all');
    return response.data.data.map(mapToProductType);
  },

  getProductsByCategory: async (category: string) => {
    const response = await apiClient.get<{ data: Product[] }>(`/product/category/${category}`);
    return response.data.data.map(mapToProductType);
  },

  getFeaturedProducts: async () => {
    const response = await apiClient.get<{ data: Product[] }>('/product/featured');
    return response.data.data.map(mapToProductType);
  },

  getProductById: async (id: string) => {
    const response = await apiClient.get<{ data: Product }>(`/product/${id}`);
    return mapToProductType(response.data.data);
  },

  searchProducts: async (query: string) => {
    const response = await apiClient.get<{ data: Product[] }>(`/product/search?q=${query}`);
    return response.data.data.map(mapToProductType);
  },

  createProduct: async (productData: FormData) => {
    const response = await apiClient.post<{ data: Product }>('/product/create', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return mapToProductType(response.data.data);
  },

  updateProduct: async (id: string, productData: FormData) => {
    const response = await apiClient.put<{ data: Product }>(`/product/${id}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return mapToProductType(response.data.data);
  },

  deleteProduct: async (id: string) => {
    const response = await apiClient.delete<{ success: boolean }>(`/product/${id}`);
    return response.data.success;
  },
};


export default productService;