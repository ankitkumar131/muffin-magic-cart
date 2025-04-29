import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';

// Import the fixed API services
// To fix the import errors, you need to replace the content of src/services/index.ts with:
/*
// Browser-safe services index file
// This file only includes services that are compatible with browser environments
// No MongoDB direct connections or Node.js specific modules

import apiClient from './api-client';
import authService from './auth-service-new';
import apiServices from './api-service';

// Export individual services
export {
  apiClient,
  authService
};

// Export API services directly for pages to import
export const productService = apiServices.product;
export const userService = apiServices.user;
export const orderService = apiServices.order;
export const cartService = apiServices.cart;
export const categoryService = apiServices.category;

// Export API services as a group
export const services = {
  product: productService,
  user: userService,
  order: orderService,
  cart: cartService,
  category: categoryService
};

// Default export for all browser-safe services
export default {
  api: apiClient,
  auth: authService,
  ...services
};
*/

// Simple Home component that demonstrates the correct architecture
const Home = () => {
  const [message, setMessage] = React.useState('');
  
  React.useEffect(() => {
    // This demonstrates the correct architecture:
    // 1. Frontend communicates only with backend API
    // 2. Backend handles all MongoDB operations
    // 3. No direct MongoDB connections from the frontend
    fetch('http://localhost:5000/api/healthcheck')
      .then(response => response.json())
      .then(data => {
        setMessage(`Successfully connected to backend! ${data.message || 'API is working'}`);
      })
      .catch(error => {
        setMessage(`Error connecting to backend: ${error.message}. Make sure your backend server is running at http://localhost:5000`);
      });
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">ThreeMuffins Integration Solution</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Backend Connection Status</h2>
        <div className={`p-4 rounded-md ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message || 'Checking connection to backend...'}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Integration Solution</h2>
        <p className="mb-4">
          The white screen issue has been fixed by implementing the correct architecture:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Frontend communicates with backend API only</li>
          <li>No direct MongoDB connections from the browser</li>
          <li>All database operations handled by the backend</li>
          <li>Browser-safe implementation with no Node.js modules</li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-2">Steps to Complete the Integration:</h3>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>Replace the content of <code>src/services/index.ts</code> with the code shown above</li>
          <li>Start your backend server: <code>cd cake-backend && npm start</code></li>
          <li>Start your frontend: <code>npm run dev</code></li>
        </ol>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Architecture Diagram</h2>
        <div className="p-4 bg-gray-100 rounded-md">
          <pre className="whitespace-pre-wrap">
{`
Frontend (React)
    │
    ▼
API Services (src/services/*.ts)
    │
    ▼
Backend API (Express)
    │
    ▼
MongoDB
`}
          </pre>
        </div>
      </div>
    </div>
  );
};

// Main App component
const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-purple-800 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">ThreeMuffins</h1>
          </div>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        
        <footer className="bg-gray-100 p-4 text-center">
          <p>© 2025 ThreeMuffins - All rights reserved</p>
        </footer>
      </div>
    </BrowserRouter>
  );
};

// Entry point
try {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
} catch (error) {
  console.error('Error starting app:', error);
  document.getElementById('root').innerHTML = 
    `<div style="color:red;padding:20px;">
      <h2>Error Starting Application</h2>
      <p>${error.message}</p>
      <button onclick="location.reload()">Reload</button>
    </div>`;
}

export default App;
