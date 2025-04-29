import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initDatabase } from './config/database';
import './index.css';

// Initialize database connection
initDatabase()
  .then(() => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      const root = ReactDOM.createRoot(rootElement);
      root.render(
        React.createElement(React.StrictMode, null,
          React.createElement(App)
        )
      );
    } else {
      console.error('Root element not found');
    }
  })
  .catch((error) => {
    console.error('Failed to initialize application:', error);
  });
