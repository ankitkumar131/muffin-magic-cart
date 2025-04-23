
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  MinusCircle,
  PlusCircle,
  Trash2,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import RequireAuth from "@/components/auth/RequireAuth";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const proceedToCheckout = () => {
    navigate("/checkout");
  };

  const renderEmptyCart = () => (
    <div className="text-center py-16">
      <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
        <ShoppingCart className="w-8 h-8 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-muted-foreground mb-8">
        Looks like you haven't added any items to your cart yet.
      </p>
      <Button asChild>
        <Link to="/catalog">Shop Now</Link>
      </Button>
    </div>
  );

  return (
    <RequireAuth>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-pacifico text-brand-darkBrown mb-8">
          Your Cart
        </h1>

        {items.length === 0 ? (
          renderEmptyCart()
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4">Product</th>
                      <th className="text-center p-4">Quantity</th>
                      <th className="text-right p-4">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.product.id} className="border-t">
                        <td className="p-4">
                          <div className="flex items-center space-x-4">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div>
                              <Link
                                to={`/products/${item.product.id}`}
                                className="font-medium hover:text-primary"
                              >
                                {item.product.name}
                              </Link>
                              <p className="text-sm text-muted-foreground">
                                ${item.product.price.toFixed(2)} each
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="p-1"
                              disabled={item.quantity <= 1}
                            >
                              <MinusCircle className="w-4 h-4" />
                            </button>
                            <span className="px-4">{item.quantity}</span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="p-1"
                            >
                              <PlusCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div>
                            <p className="font-medium">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-sm text-muted-foreground hover:text-destructive flex items-center gap-1 ml-auto"
                            >
                              <Trash2 className="w-3 h-3" /> Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div className="border rounded-lg p-6 bg-muted/30 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(totalPrice * 0.07).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 font-bold flex justify-between">
                    <span>Total</span>
                    <span>${(totalPrice * 1.07).toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  onClick={proceedToCheckout}
                  className="w-full bg-primary hover:bg-primary/90 mb-4"
                  size="lg"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                >
                  <Link to="/catalog">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RequireAuth>
  );
};

export default Cart;
