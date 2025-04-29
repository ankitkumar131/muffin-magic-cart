// import apiClient from './api-client';

// interface LoginCredentials {
//   email: string;
//   password: string;
// }

// interface RegisterData {
//   name: string;
//   email: string;
//   password: string;
// }

// interface AuthResponse {
//   user: {
//     _id: string;
//     fullName: string;
//     email: string;
//     userRole: string;
//   };
//   token: string;
// }

// const authService = {
//   login: async (credentials: LoginCredentials) => {
//     const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
//     // Store token and user data in localStorage
//     localStorage.setItem('threemuffinsToken', response.data.token);
//     localStorage.setItem('threemuffinsUser', JSON.stringify({
//       id: response.data.user._id,
//       name: response.data.user.fullName,
//       email: response.data.user.email,
//       isAdmin: response.data.user.userRole === 'ADMIN'
//     }));
//     return response.data;
//   },

//   register: async (userData: RegisterData) => {
//     const response = await apiClient.post<AuthResponse>('/auth/register', userData);
//     // Store token and user data in localStorage
//     localStorage.setItem('threemuffinsToken', response.data.token);
//     localStorage.setItem('threemuffinsUser', JSON.stringify({
//       id: response.data.user._id,
//       name: response.data.user.fullName,
//       email: response.data.user.email,
//       isAdmin: response.data.user.userRole === 'ADMIN'
//     }));
//     return response.data;
//   },

//   getCurrentUser: async () => {
//     const response = await apiClient.get('/user/me');
//     return response.data;
//   },

//   logout: () => {
//     localStorage.removeItem('threemuffinsToken');
//     localStorage.removeItem('threemuffinsUser');
//   }
// };

// export default authService;






/////////////////////////////////////////

import apiClient from './api-client';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

interface ApiSuccessResponse<T = any> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

interface AuthResponseData {
  user: {
    _id: string;
    fullName: string;
    email: string;
    userRole: string;
  };
  token: string;
}

const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await apiClient.post<ApiSuccessResponse<AuthResponseData>>('/auth/login', credentials);
      
      // Store token and user data in localStorage
      const data = response.data.data;
      localStorage.setItem('threemuffinsToken', data.token);
      localStorage.setItem('threemuffinsUser', JSON.stringify({
        id: data.user._id,
        name: data.user.fullName,
        email: data.user.email,
        isAdmin: data.user.userRole === 'ADMIN'
      }));
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData: RegisterData) => {
    try {
      // Using the correct endpoint /user/add instead of /auth/register
      await apiClient.post<ApiSuccessResponse>('/user/add', {
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
        userRole: 'USER' // Default role for new users
      });
      
      // After successful registration, login the user
      return await authService.login({
        email: userData.email,
        password: userData.password
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await apiClient.get<ApiSuccessResponse>('/user/current-user');
      return response.data.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('threemuffinsToken');
    localStorage.removeItem('threemuffinsUser');
  }
};

export default authService;
