import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initDatabase } from './config/database';
import './index.css';

// Add error boundary for debugging
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

// Initialize database connection
try {
  // First render the app to avoid white screen
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Root element not found');
  } else {
    const root = createRoot(rootElement);
    
    // Render initial loading state
    root.render(
      <React.StrictMode>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <h2>Loading ThreeMuffins...</h2>
          <p>Connecting to database...</p>
        </div>
      </React.StrictMode>
    );

    // Then initialize database and render the full app
    initDatabase()
      .then(() => {
        console.log('Database initialized successfully');
        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>
        );
      })
      .catch((error) => {
        console.error('Failed to initialize database:', error);
        // Render error state instead of blank screen
        root.render(
          <React.StrictMode>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100vh',
              flexDirection: 'column',
              gap: '1rem',
              color: 'red'
            }}>
              <h2>Error Starting Application</h2>
              <p>Could not connect to the database. Please check the console for details.</p>
              <pre>{error.message}</pre>
            </div>
          </React.StrictMode>
        );
      });
  }
} catch (error) {
  console.error('Critical initialization error:', error);
  // Try to render something even if initialization fails
  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(
      <div style={{ color: 'red', padding: '2rem' }}>
        <h1>Critical Error</h1>
        <p>The application could not start due to a critical error.</p>
        <p>Please check the console for details.</p>
      </div>
    );
  }
}
