
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Product } from "@/types/product";
import { cartService } from "@/services";
import { useAuth } from "./AuthContext";

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  isLoading: boolean;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();

  // Fetch cart from API when user is authenticated, otherwise use localStorage
  useEffect(() => {
    if (isAuthenticated) {
      fetchCartFromAPI();
    } else {
      // Load cart from localStorage when not authenticated
      const savedCart = localStorage.getItem("threemuffinsCart");
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse saved cart", e);
        }
      }
    }
  }, [isAuthenticated]);

  // Save cart to localStorage when not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("threemuffinsCart", JSON.stringify(items));
    }
  }, [items, isAuthenticated]);

  const fetchCartFromAPI = async () => {
    try {
      setIsLoading(true);
      const cartData = await cartService.getCart();
      // Convert API cart format to local format
      const cartItems = cartData.items.map(item => ({
        product: {
          id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image,
          description: item.product.description,
          category: item.product.category,
        } as Product,
        quantity: item.quantity
      }));
      setItems(cartItems);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error fetching cart',
        description: error.response?.data?.message || 'Could not fetch your cart.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = async (product: Product, quantity: number = 1) => {
    if (isAuthenticated) {
      try {
        setIsLoading(true);
        await cartService.addToCart(product.id, quantity);
        await fetchCartFromAPI(); // Refresh cart after adding item
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart.`,
        });
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Error adding to cart',
          description: error.response?.data?.message || 'Could not add item to cart.'
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Local cart handling when not authenticated
      setItems((currentItems) => {
        const existingItem = currentItems.find(
          (item) => item.product.id === product.id
        );

        if (existingItem) {
          return currentItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart.`,
        });

        return [...currentItems, { product, quantity }];
      });
    }
  };

  const removeItem = async (productId: string) => {
    if (isAuthenticated) {
      try {
        setIsLoading(true);
        await cartService.removeFromCart(productId);
        await fetchCartFromAPI(); // Refresh cart after removing item
        toast({
          title: "Removed from cart",
          description: "Item has been removed from your cart.",
        });
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Error removing from cart',
          description: error.response?.data?.message || 'Could not remove item from cart.'
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Local cart handling when not authenticated
      setItems((currentItems) => {
        const itemToRemove = currentItems.find(
          (item) => item.product.id === productId
        );
        
        if (itemToRemove) {
          toast({
            title: "Removed from cart",
            description: `${itemToRemove.product.name} has been removed from your cart.`,
          });
        }
        
        return currentItems.filter((item) => item.product.id !== productId);
      });
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;

    if (isAuthenticated) {
      try {
        setIsLoading(true);
        // Remove and add again with new quantity
        await cartService.removeFromCart(productId);
        await cartService.addToCart(productId, quantity);
        await fetchCartFromAPI(); // Refresh cart
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Error updating cart',
          description: error.response?.data?.message || 'Could not update item quantity.'
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Local cart handling when not authenticated
      setItems((currentItems) =>
        currentItems.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      // Remove all items one by one
      try {
        setIsLoading(true);
        for (const item of items) {
          await cartService.removeFromCart(item.product.id);
        }
        await fetchCartFromAPI(); // Refresh cart
        toast({
          title: "Cart cleared",
          description: "All items have been removed from your cart.",
        });
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Error clearing cart',
          description: error.response?.data?.message || 'Could not clear your cart.'
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Local cart handling when not authenticated
      setItems([]);
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
    }
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
