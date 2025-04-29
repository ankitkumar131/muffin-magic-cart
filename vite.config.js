import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // Add multiple entry points
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        minimal: path.resolve(__dirname, 'minimal.html'),
        debug: path.resolve(__dirname, 'debug.html')
      }
    },
    commonjsOptions: {
      ignore: ['mongodb', 'mongodb-client', 'util', 'crypto'],
    },
  },
  // Explicitly exclude Node.js modules that shouldn't be used in the browser
  optimizeDeps: {
    exclude: ['mongodb', 'mongodb-client', 'util', 'crypto'],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
    },
  },
});