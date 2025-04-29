import apiClient from './api-client';
import { Product as BackendProduct } from './product-service';
import { Product as FrontendProduct } from '@/types/product';

export interface OrderItem {
  product: BackendProduct;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
  updatedAt: string;
}

// Frontend order type with mapped product type
export interface FrontendOrder {
  id: string;
  userId: string;
  items: {
    product: FrontendProduct;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
  updatedAt: string;
}

// Convert backend order to frontend order type
const mapToFrontendOrder = (order: Order): FrontendOrder => ({
  id: order._id,
  userId: order.user,
  items: order.items.map(item => ({
    product: {
      id: item.product._id,
      name: item.product.name,
      description: item.product.description,
      price: item.product.price,
      image: item.product.image,
      category: item.product.category.split(',') as any[],
      featured: item.product.featured || false,
    },
    quantity: item.quantity,
    price: item.price
  })),
  totalAmount: order.totalAmount,
  status: order.status,
  shippingAddress: order.shippingAddress,
  paymentMethod: order.paymentMethod,
  paymentStatus: order.paymentStatus,
  createdAt: order.createdAt,
  updatedAt: order.updatedAt
});

const orderService = {
  createOrder: async (orderData: {
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    paymentMethod: string;
  }) => {
    const response = await apiClient.post<{ data: Order }>('/order/create', orderData);
    return mapToFrontendOrder(response.data.data);
  },

  getUserOrders: async () => {
    const response = await apiClient.get<{ data: Order[] }>('/order/user');
    return response.data.data.map(mapToFrontendOrder);
  },

  getAllOrders: async () => {
    const response = await apiClient.get<{ data: Order[] }>('/order/all');
    return response.data.data.map(mapToFrontendOrder);
  },

  getOrderById: async (id: string) => {
    const response = await apiClient.get<{ data: Order }>(`/order/${id}`);
    return mapToFrontendOrder(response.data.data);
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    const response = await apiClient.post<{ data: Order }>('/order/update', {
      orderId,
      status,
    });
    return mapToFrontendOrder(response.data.data);
  },

  cancelOrder: async (orderId: string) => {
    const response = await apiClient.post<{ data: Order }>('/order/cancel', {
      orderId,
    });
    return mapToFrontendOrder(response.data.data);
  },

  updatePaymentStatus: async (orderId: string, paymentStatus: string) => {
    const response = await apiClient.post<{ data: Order }>('/order/payment', {
      orderId,
      paymentStatus,
    });
    return mapToFrontendOrder(response.data.data);
  },
};

export default orderService;