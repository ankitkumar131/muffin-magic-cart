/**
 * Mock implementation of Razorpay for development
 * This allows the application to run without actual Razorpay credentials
 */

class MockRazorpay {
  constructor() {
    console.log("Using MockRazorpay for development");
  }

  // Mock orders API
  orders = {
    create: async (options) => {
      console.log("MockRazorpay: Creating order with options:", options);
      return {
        id: `mock_order_${Date.now()}`,
        entity: "order",
        amount: options.amount,
        amount_paid: 0,
        amount_due: options.amount,
        currency: options.currency || "INR",
        receipt: options.receipt,
        status: "created",
        created_at: new Date().getTime()
      };
    },
    
    fetch: async (orderId) => {
      console.log("MockRazorpay: Fetching order:", orderId);
      return {
        id: orderId,
        entity: "order",
        amount: 10000,
        amount_paid: 0,
        amount_due: 10000,
        currency: "INR",
        receipt: "mock_receipt",
        status: "created",
        created_at: new Date().getTime()
      };
    }
  };

  // Mock payments API
  payments = {
    capture: async (paymentId, amount) => {
      console.log("MockRazorpay: Capturing payment:", paymentId, "amount:", amount);
      return {
        id: paymentId,
        entity: "payment",
        amount: amount,
        currency: "INR",
        status: "captured",
        order_id: `mock_order_${Date.now()}`,
        method: "card",
        captured: true,
        created_at: new Date().getTime()
      };
    },
    
    fetch: async (paymentId) => {
      console.log("MockRazorpay: Fetching payment:", paymentId);
      return {
        id: paymentId,
        entity: "payment",
        amount: 10000,
        currency: "INR",
        status: "authorized",
        order_id: `mock_order_${Date.now()}`,
        method: "card",
        captured: false,
        created_at: new Date().getTime()
      };
    }
  };
}

export default MockRazorpay;
