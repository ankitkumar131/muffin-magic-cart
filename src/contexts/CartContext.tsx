
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Product } from "@/types/product";
import { cartApi, CartItem } from "@/api/cart";

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart on initial mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const cart = await cartApi.getCart();
        setItems(cart.items);
        setTotalItems(cart.totalItems);
        setTotalPrice(cart.totalPrice);
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    };
    
    loadCart();
  }, []);

  const addItem = async (product: Product, quantity: number = 1) => {
    try {
      const cart = await cartApi.addToCart(product, quantity);
      setItems(cart.items);
      setTotalItems(cart.totalItems);
      setTotalPrice(cart.totalPrice);
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to add item",
        description: "There was an error adding the item to your cart.",
      });
      console.error("Add to cart error:", error);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const itemToRemove = items.find(item => item.product.id === productId);
      const cart = await cartApi.removeFromCart(productId);
      
      setItems(cart.items);
      setTotalItems(cart.totalItems);
      setTotalPrice(cart.totalPrice);
      
      if (itemToRemove) {
        toast({
          title: "Removed from cart",
          description: `${itemToRemove.product.name} has been removed from your cart.`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to remove item",
        description: "There was an error removing the item from your cart.",
      });
      console.error("Remove from cart error:", error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;

    try {
      const cart = await cartApi.updateQuantity(productId, quantity);
      setItems(cart.items);
      setTotalItems(cart.totalItems);
      setTotalPrice(cart.totalPrice);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update quantity",
        description: "There was an error updating the item quantity.",
      });
      console.error("Update quantity error:", error);
    }
  };

  const clearCart = async () => {
    try {
      const cart = await cartApi.clearCart();
      setItems(cart.items);
      setTotalItems(cart.totalItems);
      setTotalPrice(cart.totalPrice);
      
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to clear cart",
        description: "There was an error clearing your cart.",
      });
      console.error("Clear cart error:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
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
