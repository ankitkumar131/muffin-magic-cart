
import { Order } from "@/types/order";
import { products } from "./products";

export const orders: Order[] = [
  {
    id: "ord-001",
    userId: "1",
    items: [
      {
        product: products[0],
        quantity: 1,
        price: products[0].price,
      },
      {
        product: products[5],
        quantity: 2,
        price: products[5].price * 2,
      },
    ],
    totalAmount: products[0].price + products[5].price * 2,
    status: "completed",
    createdAt: "2023-11-15T10:30:00Z",
    paymentMethod: {
      type: "Credit Card",
      last4: "4242",
    },
  },
  {
    id: "ord-002",
    userId: "1",
    items: [
      {
        product: products[2],
        quantity: 1,
        price: products[2].price,
      },
    ],
    totalAmount: products[2].price,
    status: "completed",
    createdAt: "2023-12-05T14:45:00Z",
    paymentMethod: {
      type: "Credit Card",
      last4: "5555",
    },
  },
  {
    id: "ord-003",
    userId: "2",
    items: [
      {
        product: products[7],
        quantity: 1,
        price: products[7].price,
      },
      {
        product: products[3],
        quantity: 3,
        price: products[3].price * 3,
      },
    ],
    totalAmount: products[7].price + products[3].price * 3,
    status: "completed",
    createdAt: "2023-12-10T09:15:00Z",
    paymentMethod: {
      type: "PayPal",
    },
  },
];

export const getUserOrders = (userId: string): Order[] => {
  return orders.filter(order => order.userId === userId);
};
