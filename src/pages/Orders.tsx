
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserOrders } from "@/data/orders";
import { useAuth } from "@/contexts/AuthContext";
import RequireAuth from "@/components/auth/RequireAuth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock, XCircle, ShoppingBag, ChevronRight } from "lucide-react";
import { Order } from "@/types/order";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user?.id) {
      const userOrders = getUserOrders(user.id);
      setOrders(userOrders);
    }
  }, [user]);

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

  const renderEmptyState = () => (
    <div className="text-center py-16">
      <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
        <ShoppingBag className="w-8 h-8 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
      <p className="text-muted-foreground mb-8">
        You haven't placed any orders yet. Start shopping to see your order history.
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
          Order History
        </h1>

        {orders.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Orders</CardTitle>
                <CardDescription>
                  View and track all your previous orders.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Items</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.status)}
                            <span className="capitalize">{order.status}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          ${order.totalAmount.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/orders/${order.id}`}>
                              <span className="mr-1">View</span>
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {orders.map((order) => (
              <Card key={order.id} id={`order-${order.id}`} className="overflow-hidden">
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
            ))}
          </div>
        )}
      </div>
    </RequireAuth>
  );
};

export default Orders;
