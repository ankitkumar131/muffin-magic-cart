# Muffin Magic Cart Backend

This is the backend API for the Muffin Magic Cart e-commerce application. It provides APIs for authentication, product management, order processing, and user profile management.

## Tech Stack

- **Node.js & Express**: For the server and API routes
- **MongoDB**: Database for storing products, users, and orders
- **Mongoose**: ODM for MongoDB
- **JWT**: For authentication
- **bcryptjs**: For password hashing

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables:
   - Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/muffin-magic-cart
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```

3. Seed the database with sample data (optional):
   ```
   node utils/seeder.js
   ```

4. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/users` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Products

- `GET /api/products` - Get all products (with pagination, filtering, and sorting)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product by ID
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create a product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

### Orders

- `POST /api/orders` - Create a new order (protected)
- `GET /api/orders/myorders` - Get logged in user's orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PUT /api/orders/:id/status` - Update order status (admin only)
- `GET /api/orders` - Get all orders (admin only)
- `DELETE /api/orders/:id` - Delete an order (admin only)

### Admin

- `GET /api/users` - Get all users (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `PUT /api/users/:id` - Update user (admin only)

## Models

### User

- name: String (required)
- email: String (required, unique)
- password: String (required, hashed)
- isAdmin: Boolean (default: false)
- address: Object (street, city, state, zipCode, country)
- phone: String

### Product

- name: String (required)
- description: String (required)
- price: Number (required)
- image: String (required)
- category: Array of Strings (required)
- featured: Boolean (default: false)
- ingredients: Array of Strings
- nutrition: Object (calories, fat, carbs, protein)
- countInStock: Number (required, default: 0)

### Order

- user: ObjectId (reference to User)
- items: Array of OrderItems
- shippingAddress: Object (required)
- paymentMethod: Object (required)
- totalAmount: Number (required)
- status: String (enum: pending, processing, completed, cancelled)

## Integration with Frontend

To connect the frontend with this backend:

1. Update the API base URL in your frontend services to point to this backend server (e.g., `http://localhost:5000/api`)
2. Ensure proper authentication headers are sent with protected requests
3. Handle API responses and errors appropriately in the frontend

## Future Enhancements

- Payment gateway integration
- Email notifications
- Image upload functionality
- Advanced search and filtering
- Analytics dashboard for admin