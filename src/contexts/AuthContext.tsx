
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { authApi } from "@/api";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is stored in local storage
    const loadUser = async () => {
      try {
        const userData = await authApi.getCurrentUser();
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user: userData, token } = await authApi.login({ email, password });
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("threemuffinsUser", JSON.stringify(userData));
      localStorage.setItem("threemuffinsAuthToken", token);
      
      toast({
        title: "Welcome back!",
        description: `Good to see you again, ${userData.name}!`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid email or password.",
      });
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const { user: userData, token } = await authApi.signup({ name, email, password });
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("threemuffinsUser", JSON.stringify(userData));
      localStorage.setItem("threemuffinsAuthToken", token);
      
      toast({
        title: "Welcome to ThreeMuffins!",
        description: `Your account has been created successfully, ${name}!`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Email already in use.",
      });
      throw error;
    }
  };

  const logout = () => {
    authApi.logout()
      .then(() => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("threemuffinsUser");
        localStorage.removeItem("threemuffinsAuthToken");
        
        toast({
          title: "Logged out",
          description: "You have been logged out successfully.",
        });
      })
      .catch(error => {
        console.error("Logout error:", error);
      });
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
