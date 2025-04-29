import apiClient from './api-client';
import { Category as CategoryType } from '@/types/product';

export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
}

// Convert backend category to frontend category type
const mapToCategoryType = (category: Category): { id: string; name: string; description?: string; image?: string } => ({
  id: category._id,
  name: category.name,
  description: category.description,
  image: category.image
});

const categoryService = {
  getAllCategories: async () => {
    const response = await apiClient.get<{ data: Category[] }>('/category/all');
    return response.data.data.map(mapToCategoryType);
  },

  getCategoryById: async (id: string) => {
    const response = await apiClient.get<{ data: Category }>(`/category/${id}`);
    return mapToCategoryType(response.data.data);
  },

  createCategory: async (categoryData: { name: string; description?: string; image?: File }) => {
    const formData = new FormData();
    formData.append('name', categoryData.name);
    if (categoryData.description) {
      formData.append('description', categoryData.description);
    }
    if (categoryData.image) {
      formData.append('image', categoryData.image);
    }

    const response = await apiClient.post<{ data: Category }>('/category/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return mapToCategoryType(response.data.data);
  },

  updateCategory: async (id: string, categoryData: { name?: string; description?: string; image?: File }) => {
    const formData = new FormData();
    if (categoryData.name) {
      formData.append('name', categoryData.name);
    }
    if (categoryData.description) {
      formData.append('description', categoryData.description);
    }
    if (categoryData.image) {
      formData.append('image', categoryData.image);
    }

    const response = await apiClient.put<{ data: Category }>(`/category/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return mapToCategoryType(response.data.data);
  },

  deleteCategory: async (id: string) => {
    const response = await apiClient.delete<{ success: boolean }>(`/category/${id}`);
    return response.data.success;
  },
};

export default categoryService;