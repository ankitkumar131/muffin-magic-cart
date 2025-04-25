
import { apiRequest } from "@/lib/api-client";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthResponse = {
  user: User;
  token: string;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type SignupCredentials = {
  name: string;
  email: string;
  password: string;
};

/**
 * API service for authentication operations
 */
export const authApi = {
  /**
   * Login with email and password
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // This is a temporary fallback to use mock data while API is being set up
    try {
      return await apiRequest<AuthResponse>('/auth/login', {
        method: 'POST',
        body: credentials
      });
    } catch (error) {
      console.log("API not yet implemented, using mock login");
      
      // Mock login logic - would normally be handled by a real API
      const mockUsers = [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          password: "password456",
        },
      ];
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const user = mockUsers.find(
            (u) => u.email === credentials.email && u.password === credentials.password
          );
          
          if (user) {
            const { password, ...userData } = user;
            const token = `mock-token-${userData.id}`;
            resolve({ user: userData, token });
          } else {
            reject(new Error("Invalid email or password"));
          }
        }, 800);
      });
    }
  },
  
  /**
   * Sign up with name, email, and password
   */
  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    // This is a temporary fallback to use mock data while API is being set up
    try {
      return await apiRequest<AuthResponse>('/auth/signup', {
        method: 'POST',
        body: credentials
      });
    } catch (error) {
      console.log("API not yet implemented, using mock signup");
      
      // Mock signup logic - would normally be handled by a real API
      const mockUsers = [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          password: "password456",
        },
      ];
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const existingUser = mockUsers.find((u) => u.email === credentials.email);
          if (existingUser) {
            reject(new Error("Email already in use"));
          } else {
            const newUser = {
              id: (mockUsers.length + 1).toString(),
              name: credentials.name,
              email: credentials.email,
            };
            
            mockUsers.push({ ...newUser, password: credentials.password });
            const token = `mock-token-${newUser.id}`;
            resolve({ user: newUser, token });
          }
        }, 800);
      });
    }
  },

  /**
   * Get the current user
   */
  getCurrentUser: async (): Promise<User | null> => {
    // This is a temporary fallback to use mock data while API is being set up
    try {
      return await apiRequest<User>('/auth/user');
    } catch (error) {
      console.log("API not yet implemented, returning stored user");
      const storedUser = localStorage.getItem("threemuffinsUser");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  },

  /**
   * Logout the current user
   */
  logout: async (): Promise<void> => {
    // This is a temporary fallback while API is being set up
    try {
      return await apiRequest<void>('/auth/logout', {
        method: 'POST'
      });
    } catch (error) {
      console.log("API not yet implemented, clearing local storage");
      localStorage.removeItem("threemuffinsUser");
      localStorage.removeItem("threemuffinsAuthToken");
      return;
    }
  }
};
