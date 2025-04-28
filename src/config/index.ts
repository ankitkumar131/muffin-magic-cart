// Frontend configuration

// API configuration
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000, // 10 seconds
};

// Authentication configuration
export const AUTH_CONFIG = {
  tokenKey: 'threemuffinsToken',
  userKey: 'threemuffinsUser',
  expiresIn: '30d',
};

// Application configuration
export const APP_CONFIG = {
  appName: 'Muffin Magic',
  appVersion: '1.0.0',
};