import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initDatabase } from './config/database';
import './index.css';

// Add error boundary for debugging
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

// Initialize app with error handling
const initApp = async () => {
  try {
    // First render a loading state
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found');
    }
    
    const root = createRoot(rootElement);
    
    // Show loading state
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

    // Initialize database
    console.log('Initializing database...');
    await initDatabase();
    console.log('Database initialized successfully');
    
    // Render the full app
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Application initialization error:', error);
    
    // Render error state
    const rootElement = document.getElementById('root');
    if (rootElement) {
      createRoot(rootElement).render(
        <React.StrictMode>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            flexDirection: 'column',
            gap: '1rem',
            padding: '2rem',
            color: 'red'
          }}>
            <h2>Error Starting Application</h2>
            <p>The application encountered a problem during startup.</p>
            <pre style={{ 
              background: '#f8f8f8', 
              padding: '1rem', 
              borderRadius: '4px',
              maxWidth: '80%',
              overflow: 'auto'
            }}>
              {error instanceof Error ? error.message : String(error)}
            </pre>
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: '0.5rem 1rem',
                background: '#0066cc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              Reload Application
            </button>
          </div>
        </React.StrictMode>
      );
    }
  }
};

// Start the application
initApp();
