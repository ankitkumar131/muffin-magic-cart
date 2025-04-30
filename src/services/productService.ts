export const productService = {
  async getAllProducts(category?: string) {
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const url = new URL(`${API_BASE}/api/products`);
      if (category) {
        url.searchParams.append('category', category);
      }
      
      const response = await fetch(url.toString());
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Process products to include full image URLs
      const processedData = Array.isArray(data.data) ? data.data : 
                          Array.isArray(data) ? data : 
                          data.products || [];
      
      if (!processedData.length) {
        throw new Error('No products found');
      }
      
      return processedData.map(product => ({
        ...product,
        image: product.image ? `${API_BASE}/${product.image.split('/').pop()}` : '',
        category: getCategoryFromProductId(product.productId)
      }));
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to load products');
    }
  },

  async getProductById(id: string) {
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const response = await fetch(`${API_BASE}/api/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    const product = await response.json();
    return {
      ...product,
      image: product.image ? `${API_BASE}/uploads/products/${product.image.split('/').pop()}` : ''
    };
  }
};

function getCategoryFromProductId(productId: number): string {
  if (productId >= 1 && productId <= 25) return 'Cakes';
  if (productId >= 26 && productId <= 50) return 'Muffins';
  if (productId >= 51 && productId <= 75) return 'Pastries';
  if (productId >= 76 && productId <= 100) return 'Cupcakes';
  if (productId >= 101 && productId <= 125) return 'Cookies';
  if (productId >= 126 && productId <= 150) return 'Breads';
  return 'All Products';
}