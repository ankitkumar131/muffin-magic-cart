import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Enhanced MongoDB connection function with better error handling and retry logic
export const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    console.log(`MongoDB URI: ${process.env.MONGODB_URI}`);
    console.log(`Database Name: ${process.env.DB_NAME || DB_NAME}`);
    
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME || DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    
    console.log(`\nMongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
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
};
