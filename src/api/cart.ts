
import { apiRequest } from "@/lib/api-client";
import { Product } from "@/types/product";

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartSummary = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};

/**
 * API service for cart-related operations
 */
export const cartApi = {
  /**
   * Get the current cart
   */
  getCart: async (): Promise<CartSummary> => {
    // This is a temporary fallback to use local storage while API is being set up
    try {
      return await apiRequest<CartSummary>('/cart');
    } catch (error) {
      console.log("API not yet implemented, using local storage");
      const savedCart = localStorage.getItem("threemuffinsCart");
      const items: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
      
      const totalItems = items.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      
      return { items, totalItems, totalPrice };
    }
  },

  /**
   * Add an item to the cart
   */
  addToCart: async (product: Product, quantity: number = 1): Promise<CartSummary> => {
    // This is a temporary fallback to use local storage while API is being set up
    try {
      return await apiRequest<CartSummary>('/cart/add', {
        method: 'POST',
        body: { productId: product.id, quantity },
      });
    } catch (error) {
      console.log("API not yet implemented, using local storage");
      const savedCart = localStorage.getItem("threemuffinsCart");
      let items: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
      
      const existingItemIndex = items.findIndex(
        (item) => item.product.id === product.id
      );
      
      if (existingItemIndex >= 0) {
        items = items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        items.push({ product, quantity });
      }
      
      localStorage.setItem("threemuffinsCart", JSON.stringify(items));
      
      const totalItems = items.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      
      return { items, totalItems, totalPrice };
    }
  },

  /**
   * Update item quantity in cart
   */
  updateQuantity: async (productId: string, quantity: number): Promise<CartSummary> => {
    // This is a temporary fallback to use local storage while API is being set up
    try {
      return await apiRequest<CartSummary>(`/cart/update`, {
        method: 'PUT',
        body: { productId, quantity },
      });
    } catch (error) {
      console.log("API not yet implemented, using local storage");
      const savedCart = localStorage.getItem("threemuffinsCart");
      let items: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
      
      items = items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      
      localStorage.setItem("threemuffinsCart", JSON.stringify(items));
      
      const totalItems = items.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      
      return { items, totalItems, totalPrice };
    }
  },

  /**
   * Remove an item from the cart
   */
  removeFromCart: async (productId: string): Promise<CartSummary> => {
    // This is a temporary fallback to use local storage while API is being set up
    try {
      return await apiRequest<CartSummary>(`/cart/remove`, {
        method: 'DELETE',
        body: { productId },
      });
    } catch (error) {
      console.log("API not yet implemented, using local storage");
      const savedCart = localStorage.getItem("threemuffinsCart");
      let items: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
      
      items = items.filter((item) => item.product.id !== productId);
      
      localStorage.setItem("threemuffinsCart", JSON.stringify(items));
      
      const totalItems = items.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      
      return { items, totalItems, totalPrice };
    }
  },

  /**
   * Clear the cart
   */
  clearCart: async (): Promise<CartSummary> => {
    // This is a temporary fallback to use local storage while API is being set up
    try {
      return await apiRequest<CartSummary>(`/cart/clear`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.log("API not yet implemented, using local storage");
      localStorage.removeItem("threemuffinsCart");
      
      return { items: [], totalItems: 0, totalPrice: 0 };
    }
  },
};
