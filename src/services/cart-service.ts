import apiClient from './api-client';
import { Product } from './product-service';

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalPrice: number;
}

const cartService = {
  getCart: async () => {
    const response = await apiClient.get<{ data: Cart }>('/cart');
    return response.data.data;
  },

  addToCart: async (productId: string, quantity: number) => {
    const response = await apiClient.post<{ data: Cart }>('/cart/add', {
      productId,
      quantity,
    });
    return response.data.data;
  },

  removeFromCart: async (productId: string) => {
    const response = await apiClient.delete<{ data: Cart }>('/cart/remove', {
      data: { productId },
    });
    return response.data.data;
  },
};

export default cartService;