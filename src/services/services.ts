// Integrated services export file
import apiClient from './api-client';
import authService from './auth-service';
import cartService from './cart-service';
import categoryService from './category-service';
import orderService from './order-service';
import productService from './product-service';
import userService from './user-service';
import { connectDB, getDB, disconnectDB } from './mongodb';
import DBService from './db-service';
import integratedServices from './integrated-services';

// Export MongoDB services
export {
  connectDB,
  getDB,
  disconnectDB,
  DBService
};

// Export integrated services
export const integrated = integratedServices;

// Default export for all services
export default {
  api: apiClient,
  auth: authService,
  cart: cartService,
  category: categoryService,
  order: orderService,
  product: productService,
  user: userService,
  db: {
    connect: connectDB,
    get: getDB,
    disconnect: disconnectDB,
    service: DBService
  },
  integrated: integratedServices
};
