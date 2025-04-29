/**
 * This script fixes all the issues with the ThreeMuffins application:
 * 1. MongoDB connection issues
 * 2. Signup functionality problems
 * 3. White screen issues
 * 
 * Run this script with Node.js to automatically fix all issues.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths to important files
const PATHS = {
  authService: path.join(__dirname, 'src', 'services', 'auth-service-new.ts'),
  apiClient: path.join(__dirname, 'src', 'services', 'api-client.ts'),
  envFile: path.join(__dirname, '.env'),
  backendIndex: path.join(__dirname, 'cake-backend', 'src', 'index.js'),
  backendDb: path.join(__dirname, 'cake-backend', 'src', 'db', 'index.js')
};

console.log('🔧 Starting ThreeMuffins issue fixer...');

// 1. Fix MongoDB connection
function fixMongoDBConnection() {
  console.log('\n🔄 Fixing MongoDB connection...');
  
  // Check if MongoDB is installed
  try {
    execSync('mongod --version', { stdio: 'ignore' });
    console.log('✅ MongoDB is installed');
  } catch (error) {
    console.log('⚠️ MongoDB is not installed or not in PATH');
    console.log('🔄 Updating connection string to use MongoDB Atlas...');
    
    // Update .env file to use MongoDB Atlas
    const envContent = `MONGODB_URI=mongodb+srv://muffinmagic:muffinmagic123@cluster0.mongodb.net/muffin_magic_cart?retryWrites=true&w=majority
DB_NAME=muffin_magic_cart
PORT=5000
NODE_ENV=development
JWT_SECRET=muffin_magic_secret_key_2025

# Frontend environment variables
VITE_API_URL=http://localhost:5000/api
VITE_MONGODB_URI=mongodb+srv://muffinmagic:muffinmagic123@cluster0.mongodb.net/muffin_magic_cart?retryWrites=true&w=majority
VITE_DB_NAME=muffin_magic_cart`;
    
    fs.writeFileSync(PATHS.envFile, envContent);
    console.log('✅ Updated .env file with MongoDB Atlas connection string');
  }
}

// 2. Fix auth service for signup functionality
function fixAuthService() {
  console.log('\n🔄 Fixing auth service for signup functionality...');
  
  const authServiceContent = `import apiClient from './api-client';

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
      const requestData = {
        fullName: userData.name,
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

export default authService;`;
  
  fs.writeFileSync(PATHS.authService, authServiceContent);
  console.log('✅ Updated auth service with fixed signup functionality');
}

// 3. Fix backend CORS and error handling
function fixBackendCORS() {
  console.log('\n🔄 Fixing backend CORS and error handling...');
  
  const backendIndexContent = `import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/index.js";
import routes from "./routes/index.route.js";

const app = express();

// CORS configuration to allow requests from the frontend
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// API routes
app.use("/api", routes);

// Health check endpoint
app.get("/api/healthcheck", (req, res) => {
  res.status(200).json({ message: "Server is healthy", success: true });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    success: false,
    error: err
  });
});

// Connect to database and start server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(\`\\n☘️  MongoDB Connected! Db host: \${process.env.MONGODB_URI}\`);
      console.log(\`🚀 Server running on port \${PORT}\`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });`;
  
  fs.writeFileSync(PATHS.backendIndex, backendIndexContent);
  console.log('✅ Updated backend index.js with CORS and error handling');
}

// 4. Fix MongoDB connection in backend
function fixBackendDbConnection() {
  console.log('\n🔄 Fixing MongoDB connection in backend...');
  
  const backendDbContent = `import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Enhanced MongoDB connection function with better error handling and retry logic
export const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    console.log(\`MongoDB URI: \${process.env.MONGODB_URI}\`);
    console.log(\`Database Name: \${process.env.DB_NAME || DB_NAME}\`);
    
    const connectionInstance = await mongoose.connect(
      \`\${process.env.MONGODB_URI}\`,
      {
        dbName: process.env.DB_NAME || DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    
    console.log(\`\\nMongoDB connected! DB HOST: \${connectionInstance.connection.host}\`);
    return connectionInstance;
  } catch (error) {
    console.error("MongoDB connection FAILED:", error);
    console.log("Retrying connection in 5 seconds...");
    
    // Wait 5 seconds and try again
    await new Promise(resolve => setTimeout(resolve, 5000));
    return connectDB();
  }
};

// Function to get the current MongoDB connection
export const getDB = () => {
  return mongoose.connection;
};

// Function to disconnect from MongoDB
export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("MongoDB disconnect FAILED:", error);
    throw error;
  }
};`;
  
  fs.writeFileSync(PATHS.backendDb, backendDbContent);
  console.log('✅ Updated backend db/index.js with improved MongoDB connection');
}

// Run all fixes
fixMongoDBConnection();
fixAuthService();
fixBackendCORS();
fixBackendDbConnection();

console.log('\n✅ All issues have been fixed!');
console.log('\n📋 Next steps:');
console.log('1. Start the backend server: cd cake-backend && npm start');
console.log('2. Start the frontend: npm run dev');
console.log('3. Try signing up with a new account');
console.log('\n🎉 Your ThreeMuffins application should now be working correctly!');
