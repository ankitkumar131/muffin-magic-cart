import { LoginCredentials, RegisterCredentials, AuthResponse } from "@/types/auth";

const API_URL = "http://localhost:5000/api/user";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append("fullName", credentials.fullName);
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);

    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return response.json();
  },
};