
/**
 * API Client utility for making requests to our backend
 */

const API_URL = import.meta.env.VITE_API_URL || '/api';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
};

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', headers = {}, body } = options;

  const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // Get auth token from localStorage if it exists
  const token = localStorage.getItem('threemuffinsAuthToken');
  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
    credentials: 'include',
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, requestOptions);

  // Handle HTTP errors
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'An unknown error occurred',
    }));
    throw new Error(error.message || `HTTP error! Status: ${response.status}`);
  }

  // Return null for 204 No Content responses
  if (response.status === 204) {
    return null as T;
  }

  // For other successful responses, parse JSON
  return await response.json();
}
