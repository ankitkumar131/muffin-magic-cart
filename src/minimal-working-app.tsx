import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';

// Import services directly from api-service to avoid any potential issues
import { productService } from './services/api-service';

// Simple component to test API connection
const ApiTest = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products...');
        const data = await productService.getAll();
        console.log('Products fetched:', data);
        setProducts(data);
        setStatus('success');
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to fetch products');
        setStatus('error');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">API Connection Test</h2>
      
      {status === 'loading' && (
        <div className="bg-blue-50 p-4 rounded-md">
          <p>Loading products from API...</p>
        </div>
      )}
      
      {status === 'error' && (
        <div className="bg-red-50 p-4 rounded-md border border-red-200">
          <h3 className="text-red-700 font-semibold mb-2">Error connecting to API</h3>
          <p className="text-red-600">{error}</p>
          <div className="mt-4 p-3 bg-yellow-50 rounded-md">
            <p className="font-medium">Troubleshooting steps:</p>
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              <li>Make sure the backend server is running</li>
              <li>Check that the API endpoint is correct in api-client.ts</li>
              <li>Verify that CORS is properly configured on the backend</li>
              <li>Check browser console for additional error details</li>
            </ol>
          </div>
        </div>
      )}
      
      {status === 'success' && (
        <div className="bg-green-50 p-4 rounded-md border border-green-200">
          <h3 className="text-green-700 font-semibold mb-2">Successfully connected to API!</h3>
          <p className="mb-4">Found {products.length} products</p>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product: any) => (
                <div key={product._id} className="border rounded-lg p-4 bg-white shadow-sm">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-gray-500">{product.category}</p>
                  <p className="text-green-600 font-bold mt-2">${product.price?.toFixed(2) || '0.00'}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No products found in the database.</p>
          )}
        </div>
      )}
    </div>
  );
};

// Simple Home component
const Home = () => (
  <div className="p-6 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-6">ThreeMuffins - Minimal Working App</h1>
    <p className="mb-4">This is a minimal version of the app to test core functionality.</p>
    <div className="flex space-x-4 mb-8">
      <Link to="/" className="text-purple-600 hover:underline">Home</Link>
      <Link to="/api-test" className="text-purple-600 hover:underline">API Test</Link>
    </div>
    <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
      <h2 className="text-xl font-semibold mb-3">Welcome to ThreeMuffins</h2>
      <p>This minimal app is designed to test the core functionality and fix the white screen issue.</p>
      <p className="mt-2">Click on "API Test" to check the connection to the backend.</p>
    </div>
  </div>
);

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Main App component
const MinimalWorkingApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-purple-800 text-white p-4">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold">ThreeMuffins</h1>
            </div>
          </header>
          
          <main className="container mx-auto py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/api-test" element={<ApiTest />} />
            </Routes>
          </main>
          
          <footer className="bg-gray-100 p-4 text-center text-gray-600">
            <p>© 2025 ThreeMuffins - All rights reserved</p>
          </footer>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default MinimalWorkingApp;
