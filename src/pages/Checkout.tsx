
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import RequireAuth from "@/components/auth/RequireAuth";
import { CreditCard, CheckCircle2 } from "lucide-react";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvc: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.address || !formData.city || 
        !formData.state || !formData.zipCode) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields.",
      });
      return;
    }

    if (paymentMethod === "credit-card" && 
        (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvc)) {
      toast({
        variant: "destructive",
        title: "Missing payment information",
        description: "Please fill in all payment details.",
      });
      return;
    }

    // Process payment
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Create a mock order ID
      const orderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
      
      clearCart();
      navigate("/order-confirmation", { 
        state: { 
          orderId, 
          orderDate: new Date().toISOString(),
          totalAmount: (totalPrice * 1.07).toFixed(2),
          items
        } 
      });
    }, 2000);
  };

  return (
    <RequireAuth>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-pacifico text-brand-darkBrown mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Information</CardTitle>
                    <CardDescription>
                      Enter your address where you want your order delivered.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="zipCode">Zip Code</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Select
                            value={formData.country}
                            onValueChange={(value) =>
                              setFormData({ ...formData, country: value })
                            }
                          >
                            <SelectTrigger id="country">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="US">United States</SelectItem>
                              <SelectItem value="CA">Canada</SelectItem>
                              <SelectItem value="UK">United Kingdom</SelectItem>
                              <SelectItem value="AU">Australia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>
                      Select your payment method and enter your payment details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                        <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      </TabsList>
                      <TabsContent value="credit-card" className="space-y-4 mt-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            placeholder="John Doe"
                            value={formData.cardName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              name="expiryDate"
                              placeholder="MM/YY"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC</Label>
                            <Input
                              id="cvc"
                              name="cvc"
                              placeholder="123"
                              value={formData.cvc}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="paypal" className="mt-4">
                        <div className="text-center py-6">
                          <p className="mb-4">
                            You will be redirected to PayPal to complete your payment.
                          </p>
                          <div className="flex justify-center">
                            <img
                              src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
                              alt="PayPal"
                              className="h-16"
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </form>
          </div>

          <div>
            <div className="border rounded-lg p-6 bg-muted/30 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <span>
                      {item.quantity} x {item.product.name}
                    </span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6 border-t pt-3">
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
                onClick={handleSubmit}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Complete Order
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
};

export default Checkout;
