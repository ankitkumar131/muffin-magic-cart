
import { useParams, Link, Navigate } from "react-router-dom";
import { getOrderById } from "@/data/orders";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Check, Clock, XCircle } from "lucide-react";
import { Order } from "@/types/order";

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { user } = useAuth();
  
  // Get order details
  const order = orderId ? getOrderById(orderId) : null;
  
  // Check if order exists and belongs to current user
  const isUserOrder = order && user && order.userId === user.id;
  
  if (!order) {
    return <Navigate to="/orders" replace />;
  }
  
  if (!isUserOrder) {
    return <Navigate to="/orders" replace />;
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="w-5 h-5 text-green-500" />;
      case "processing":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link to="/orders" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-pacifico text-brand-darkBrown mb-8">
        Order Details
      </h1>

      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/30">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Order {order.id}</CardTitle>
              <CardDescription>
                {formatDate(order.createdAt)}
              </CardDescription>
            </div>
            <div className="bg-white px-3 py-1 rounded-full border flex items-center gap-2">
              {getStatusIcon(order.status)}
              <span className="capitalize">{order.status}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Items</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={`${order.id}-item-${index}`}
                    className="flex items-center gap-4 pb-3 border-b"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/products/${item.product.id}`}
                        className="font-medium hover:text-primary"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div>
                <p className="text-sm text-muted-foreground">
                  Payment Method
                </p>
                <p>{order.paymentMethod.type}</p>
                {order.paymentMethod.last4 && (
                  <p className="text-sm text-muted-foreground">
                    **** **** **** {order.paymentMethod.last4}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  Total Amount
                </p>
                <p className="text-lg font-semibold">
                  ${order.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" size="sm">
                Download Invoice
              </Button>
              <Button size="sm">Reorder</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetails;
