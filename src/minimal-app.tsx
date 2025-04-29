import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';

// Import browser-safe services
import services from './services/browser-index';

// Simple Home component
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await services.product.getAll();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">ThreeMuffins - Featured Products</h1>
      
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <div className="bg-red-100 p-4 rounded-md text-red-700">
          <p>Error: {error}</p>
          <p>Make sure your backend server is running!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <div key={product._id} className="border rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <p className="text-sm text-gray-500 mb-3">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">${product.price?.toFixed(2) || '0.00'}</span>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
          
          {products.length === 0 && (
            <div className="col-span-3 text-center p-8 bg-gray-50 rounded-lg">
              <p>No products found. Add some products to get started!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Simple About component
const About = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">About ThreeMuffins</h1>
    <p className="mb-4">
      ThreeMuffins is a delightful bakery offering handcrafted cakes, muffins, and pastries made with love.
    </p>
    <p className="mb-4">
      Our mission is to bring joy to our customers through delicious treats made with the finest ingredients.
    </p>
  </div>
);

// Simple NotFound component
const NotFound = () => (
  <div className="container mx-auto p-6 text-center">
    <h1 className="text-3xl font-bold mb-6">Page Not Found</h1>
    <p className="mb-6">Sorry, the page you are looking for does not exist.</p>
    <Link to="/" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
      Go Home
    </Link>
  </div>
);

// Simple Layout component
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <header className="bg-purple-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">ThreeMuffins</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
    
    <main className="flex-grow">
      {children}
    </main>
    
    <footer className="bg-gray-100 p-4 text-center">
      <p>© 2025 ThreeMuffins - All rights reserved</p>
    </footer>
  </div>
);

// Main App component
const MinimalApp = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default MinimalApp;
