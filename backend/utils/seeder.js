import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import { connectDB } from '../config/db.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password456',
  },
];

const products = [
  {
    name: 'Chocolate Cake',
    description: 'Rich and moist chocolate cake with chocolate ganache.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D',
    category: ['cakes', 'featured'],
    featured: true,
    ingredients: ['flour', 'sugar', 'cocoa powder', 'eggs', 'butter'],
    nutrition: {
      calories: 350,
      fat: 18,
      carbs: 45,
      protein: 5,
    },
    countInStock: 10,
  },
  {
    name: 'Blueberry Muffins',
    description: 'Fluffy muffins packed with fresh blueberries.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1607958996333-41784c70c366?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: ['muffins'],
    featured: false,
    ingredients: ['flour', 'sugar', 'blueberries', 'eggs', 'milk'],
    nutrition: {
      calories: 220,
      fat: 9,
      carbs: 32,
      protein: 3,
    },
    countInStock: 25,
  },
  {
    name: 'Croissant',
    description: 'Buttery and flaky French pastry.',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: ['pastries', 'featured'],
    featured: true,
    ingredients: ['flour', 'butter', 'yeast', 'sugar', 'salt'],
    nutrition: {
      calories: 270,
      fat: 14,
      carbs: 31,
      protein: 5,
    },
    countInStock: 30,
  },
  {
    name: 'Vanilla Cupcakes',
    description: 'Classic vanilla cupcakes with buttercream frosting.',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: ['cupcakes'],
    featured: false,
    ingredients: ['flour', 'sugar', 'vanilla extract', 'eggs', 'butter'],
    nutrition: {
      calories: 180,
      fat: 7,
      carbs: 28,
      protein: 2,
    },
    countInStock: 40,
  },
];

// Import data function
const importData = async () => {
  try {
    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Insert users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Insert products with admin user reference
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);

    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Destroy data function
const destroyData = async () => {
  try {
    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run script based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}