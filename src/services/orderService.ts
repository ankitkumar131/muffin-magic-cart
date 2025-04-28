import { orderAPI } from './api';
import { Product } from '../types/product';

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  product?: Product;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export const orderService = {
  createOrder: async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
    return await orderAPI.createOrder(orderData);
  },
  
  getUserOrders: async (): Promise<Order[]> => {
    return await orderAPI.getMyOrders();
  },
  
  getOrderById: async (id: string): Promise<Order> => {
    return await orderAPI.getOrderById(id);
  }
};