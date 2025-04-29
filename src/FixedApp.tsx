import React from 'react';
// Import directly from components folder instead of using path aliases
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages - using relative imports instead of path aliases
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Catalog from "./pages/Catalog";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";

// Create a simplified version of the contexts and components that were using path aliases
const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  return <>{children}</>;
};

const CartProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  return <>{children}</>;
};

const TooltipProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  return <>{children}</>;
};

const Toaster: React.FC = () => null;
const Sonner: React.FC = () => null;

// Simple Layout component
const Layout: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return (
    <div className="app-layout">
      <header className="bg-purple-800 text-white p-4">
        <h1 className="text-2xl font-bold">ThreeMuffins</h1>
        <nav className="mt-2">
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/catalog" className="hover:underline">Catalog</a></li>
            <li><a href="/cart" className="hover:underline">Cart</a></li>
            <li><a href="/login" className="hover:underline">Login</a></li>
          </ul>
        </nav>
      </header>
      <main className="p-4">
        {children}
      </main>
      <footer className="bg-gray-200 p-4 text-center">
        <p>© 2025 ThreeMuffins - All rights reserved</p>
      </footer>
    </div>
  );
};

const queryClient = new QueryClient();

const FixedApp: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/catalog" element={<Layout><Catalog /></Layout>} />
              <Route path="/products/:productId" element={<Layout><ProductDetails /></Layout>} />
              <Route path="/cart" element={<Layout><Cart /></Layout>} />
              <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
              <Route path="/order-confirmation" element={<Layout><OrderConfirmation /></Layout>} />
              <Route path="/orders" element={<Layout><Orders /></Layout>} />
              <Route path="/orders/:orderId" element={<Layout><OrderDetails /></Layout>} />
              <Route path="/login" element={<Layout><Login /></Layout>} />
              <Route path="/signup" element={<Layout><Signup /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/faq" element={<Layout><FAQ /></Layout>} />
              <Route path="/terms" element={<Layout><Terms /></Layout>} />
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default FixedApp;
