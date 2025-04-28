import axios from 'axios';

import { API_CONFIG } from '../config';

const API_URL = API_CONFIG.baseUrl;

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('threemuffinsToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/users/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('threemuffinsToken', response.data.token);
      localStorage.setItem('threemuffinsUser', JSON.stringify({
        id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        isAdmin: response.data.isAdmin,
      }));
    }
    return response.data;
  },
  
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/users', { name, email, password });
    if (response.data.token) {
      localStorage.setItem('threemuffinsToken', response.data.token);
      localStorage.setItem('threemuffinsUser', JSON.stringify({
        id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        isAdmin: response.data.isAdmin,
      }));
    }
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('threemuffinsToken');
    localStorage.removeItem('threemuffinsUser');
  },
  
  getUserProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
  
  updateUserProfile: async (userData: any) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },
};

// Products API
export const productAPI = {
  getProducts: async (params?: { 
    page?: number; 
    category?: string; 
    search?: string; 
    featured?: boolean;
  }) => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  
  getProductById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  getFeaturedProducts: async (limit?: number) => {
    const response = await api.get('/products/featured', { params: { limit } });
    return response.data;
  },
  
  getProductsByCategory: async (category: string) => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },
  
  // Admin operations
  createProduct: async (productData: any) => {
    const response = await api.post('/products', productData);
    return response.data;
  },
  
  updateProduct: async (id: string, productData: any) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },
  
  deleteProduct: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

// Orders API
export const orderAPI = {
  createOrder: async (orderData: any) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  
  getOrderById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
  
  getMyOrders: async () => {
    const response = await api.get('/orders/myorders');
    return response.data;
  },
  
  // Admin operations
  getAllOrders: async (page?: number) => {
    const response = await api.get('/orders', { params: { page } });
    return response.data;
  },
  
  updateOrderStatus: async (id: string, status: string) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },
  
  deleteOrder: async (id: string) => {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
  },
};

// Admin API
export const adminAPI = {
  getUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  
  getUserById: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  
  updateUser: async (id: string, userData: any) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },
  
  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

export default {
  auth: authAPI,
  products: productAPI,
  orders: orderAPI,
  admin: adminAPI,
};