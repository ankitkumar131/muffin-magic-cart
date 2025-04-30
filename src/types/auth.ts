export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}