
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

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

// Mock users for demo purposes - in real app, this would be in a database
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem("threemuffinsUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - would be an API call in a real app
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(
          (u) => u.email === email && u.password === password
        );
        
        if (foundUser) {
          const { password, ...userData } = foundUser;
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem("threemuffinsUser", JSON.stringify(userData));
          toast({
            title: "Welcome back!",
            description: `Good to see you again, ${userData.name}!`,
          });
          resolve();
        } else {
          toast({
            variant: "destructive",
            title: "Login failed",
            description: "Invalid email or password.",
          });
          reject("Invalid credentials");
        }
      }, 800);
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup - would be an API call in a real app
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find((u) => u.email === email);
        if (existingUser) {
          toast({
            variant: "destructive",
            title: "Signup failed",
            description: "Email already in use.",
          });
          reject("Email already in use");
        } else {
          const newUser = {
            id: (mockUsers.length + 1).toString(),
            name,
            email,
          };
          
          // In a real app, this would be added to a database
          mockUsers.push({ ...newUser, password });
          
          setUser(newUser);
          setIsAuthenticated(true);
          localStorage.setItem("threemuffinsUser", JSON.stringify(newUser));
          toast({
            title: "Welcome to ThreeMuffins!",
            description: `Your account has been created successfully, ${name}!`,
          });
          resolve();
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("threemuffinsUser");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
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
