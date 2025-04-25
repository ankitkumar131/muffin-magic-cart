
import { apiRequest } from "@/lib/api-client";
import { Order } from "@/types/order";

/**
 * API service for order-related operations
 */
export const orderApi = {
  /**
   * Get all orders for the current user
   */
  getUserOrders: async (): Promise<Order[]> => {
    // This is a temporary fallback to use local data while API is being set up
    try {
      return await apiRequest<Order[]>('/orders');
    } catch (error) {
      console.log("API not yet implemented, using local data");
      const { getUserOrders } = await import('@/data/orders');
      const { user } = await import('@/contexts/AuthContext').then(m => m.useAuth());
      
      return user?.id ? getUserOrders(user.id) : [];
    }
  },

  /**
   * Get a single order by ID
   */
  getOrderById: async (orderId: string): Promise<Order | null> => {
    // This is a temporary fallback to use local data while API is being set up
    try {
      return await apiRequest<Order>(`/orders/${orderId}`);
    } catch (error) {
      console.log("API not yet implemented, using local data");
      const { getOrderById } = await import('@/data/orders');
      return getOrderById(orderId);
    }
  },

  /**
   * Create a new order
   */
  createOrder: async (orderData: Omit<Order, 'id' | 'userId' | 'createdAt' | 'status'>): Promise<Order> => {
    return apiRequest<Order>('/orders', {
      method: 'POST',
      body: orderData,
    });
  },
  
  /**
   * Update order status
   */
  updateOrderStatus: async (orderId: string, status: 'pending' | 'processing' | 'completed' | 'cancelled'): Promise<Order> => {
    return apiRequest<Order>(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: { status },
    });
  }
};
