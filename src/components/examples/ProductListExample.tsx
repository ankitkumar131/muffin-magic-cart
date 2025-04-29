import React, { useState } from 'react';
import { useMongoService } from '../../hooks/useMongoService';
import { productService } from '../../services/integrated-services';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
  inStock: boolean;
}

const ProductListExample: React.FC = () => {
  const {
    data: products,
    loading,
    error,
    isConnected,
    fetchData,
    create,
    update,
    remove,
    search
  } = useMongoService<Product>(productService);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    inStock: true
  });
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
      const results = await search(searchQuery);
      setSearchResults(results);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setNewProduct(prev => ({ ...prev, [name]: parseFloat(value) }));
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setNewProduct(prev => ({ ...prev, [name]: checked }));
    } else {
      setNewProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle product creation
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await create(newProduct);
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        category: '',
        inStock: true
      });
      setIsAdding(false);
    } catch (err) {
      console.error('Error creating product:', err);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await remove(id);
    }
  };

  // Refresh product list
  const refreshProducts = () => {
    fetchData();
    setSearchResults([]);
    setSearchQuery('');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex items-center">
          <span className={`mr-2 inline-block w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span>{isConnected ? 'Connected to MongoDB' : 'Not connected to MongoDB'}</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex">
        <input
          type="text"
          placeholder="Search products..."
          className="flex-grow p-2 border rounded-l"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
          onClick={handleSearch}
          disabled={isSearching}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
        <button 
          className="ml-2 bg-gray-200 px-4 py-2 rounded"
          onClick={refreshProducts}
        >
          Reset
        </button>
      </div>

      {/* Add Product Button */}
      <div className="mb-6">
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setIsAdding(!isAdding)}
        >
          {isAdding ? 'Cancel' : 'Add New Product'}
        </button>
      </div>

      {/* Add Product Form */}
      {isAdding && (
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Add New Product</h2>
          <form onSubmit={handleCreateProduct}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">In Stock</label>
                <input
                  type="checkbox"
                  name="inStock"
                  checked={newProduct.inStock}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span>Available for purchase</span>
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1">Description</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  rows={3}
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <button 
                type="submit" 
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
          <p>Error: {error.message}</p>
        </div>
      )}

      {/* Product List */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          {searchResults.length > 0 
            ? `Search Results (${searchResults.length})` 
            : `All Products (${products.length})`}
        </h2>
        
        {loading ? (
          <div className="text-center p-4">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(searchResults.length > 0 ? searchResults : products).map(product => (
              <div key={product._id} className="border rounded p-4 relative">
                <button 
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  ×
                </button>
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.category}</p>
                <p className="text-green-600 font-bold mb-2">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                <div className="flex items-center">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && products.length === 0 && searchResults.length === 0 && (
          <div className="text-center p-4 border rounded bg-gray-50">
            <p>No products found. Add some products to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListExample;
