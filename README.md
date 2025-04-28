# Muffin Magic Cart

A full-stack e-commerce application for a bakery shop, featuring product browsing, shopping cart functionality, user authentication, and order management.

## Project Structure

The project consists of two main parts:

- **Backend**: Node.js/Express API with MongoDB database
- **Frontend**: React/TypeScript application with Tailwind CSS

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Ensure the `.env` file in the backend directory has the following variables:
     ```
     NODE_ENV=development
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/muffin-magic-cart
     JWT_SECRET=muffin123secret456magic789
     JWT_EXPIRE=30d
     ```

4. Start the backend server:
   ```
   npm start
   ```
   The server will run on http://localhost:5000

### Frontend Setup

1. From the project root directory, install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the project root with the following content:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   The application will be available at http://localhost:5173

## Running the Full Application

For the best development experience, run both the backend and frontend servers simultaneously:

1. Start the backend server in one terminal:
   ```
   cd backend
   npm start
   ```

2. Start the frontend development server in another terminal:
   ```
   npm run dev
   ```
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ee5cf9df-fe1a-45fc-9cc1-b746b4203943) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
