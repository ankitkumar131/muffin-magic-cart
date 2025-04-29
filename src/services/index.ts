// Browser-safe services index file
// This file only includes services that are compatible with browser environments
// No MongoDB direct connections or Node.js specific modules

import apiClient from './api-client';
import authService from './auth-service-new';
import apiServices, { 
  productService, 
  userService, 
  orderService, 
  cartService, 
  categoryService 
} from './api-service';

// Export individual services directly for pages to import
export {
  apiClient,
  authService,
  productService,
  userService,
  orderService,
  cartService,
  categoryService
};

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
