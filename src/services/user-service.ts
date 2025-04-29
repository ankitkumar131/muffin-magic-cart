import apiClient from './api-client';

export interface User {
  _id: string;
  fullName: string;
  email: string;
  userRole: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Frontend user type
export interface FrontendUser {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Convert backend user to frontend user type
const mapToFrontendUser = (user: User): FrontendUser => ({
  id: user._id,
  name: user.fullName,
  email: user.email,
  isAdmin: user.userRole === 'ADMIN',
  avatar: user.avatar,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

const userService = {
  getCurrentUser: async () => {
    const response = await apiClient.get<{ data: User }>('/user/me');
    return mapToFrontendUser(response.data.data);
  },

  getUserById: async (id: string) => {
    const response = await apiClient.get<{ data: User }>(`/user/${id}`);
    return mapToFrontendUser(response.data.data);
  },

  getAllUsers: async () => {
    const response = await apiClient.get<{ data: User[] }>('/user/all');
    return response.data.data.map(mapToFrontendUser);
  },

  updateCurrentUser: async (userData: {
    fullName?: string;
    email?: string;
  }) => {
    const response = await apiClient.patch<{ data: User }>('/user/me', userData);
    return mapToFrontendUser(response.data.data);
  },

  changePassword: async (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
    const response = await apiClient.post<{ success: boolean; message: string }>('/user/change-password', data);
    return response.data;
  },

  updateAvatar: async (formData: FormData) => {
    const response = await apiClient.post<{ data: User }>('/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return mapToFrontendUser(response.data.data);
  },

  // Admin operations
  updateUser: async (id: string, userData: {
    fullName?: string;
    email?: string;
    userRole?: string;
  }) => {
    const response = await apiClient.patch<{ data: User }>(`/user/${id}`, userData);
    return mapToFrontendUser(response.data.data);
  },

  deleteUser: async (id: string) => {
    const response = await apiClient.delete<{ success: boolean }>(`/user/${id}`);
    return response.data.success;
  },
};

export default userService;