import apiClient from './api-client';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
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
      console.log('Login attempt with:', credentials.email);
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
      console.log('Registering user with data:', userData);
      
      // Map the frontend field names to what the backend expects
      // IMPORTANT: The backend validator expects 'fullname' (lowercase 'n')
      // This matches the field name in the User model
      const requestData = {
        fullname: userData.name, // This is the critical field name that must match the backend
        email: userData.email,
        password: userData.password,
        userRole: 'USER' // Default role for new users
      };
      
      console.log('Sending registration request with data:', requestData);
      
      // Using the correct endpoint and field names - the backend route is /user/add
      const response = await apiClient.post<ApiSuccessResponse>('/user/add', requestData);
      console.log('Registration response:', response.data);
      
      // After successful registration, login the user
      return await authService.login({
        email: userData.email,
        password: userData.password
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response?.data);
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