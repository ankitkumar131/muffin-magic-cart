// Export all services for easy importing
import apiClient from './api-client';
import authService from './auth-service';
import apiServices from './api-service';

// Export individual services
export {
  apiClient,
  authService
};

// Export API services
export const services = apiServices;

// Default export for all services
export default {
  api: apiClient,
  auth: authService,
  ...apiServices
};
