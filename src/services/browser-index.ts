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

// Export API services
export const services = {
  product: apiServices.product,
  user: apiServices.user,
  order: apiServices.order,
  cart: apiServices.cart,
  category: apiServices.category
};

// Default export for all browser-safe services
export default {
  api: apiClient,
  auth: authService,
  ...services
};
