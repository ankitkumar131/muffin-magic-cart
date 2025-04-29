import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Import the fixed services that properly export what the pages need
import * as services from './services/fixed-services';

// Make services available globally for debugging
window.services = services;

try {
  console.log('Starting ThreeMuffins application with fixed services');
  
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    console.error('Root element not found');
  }
} catch (error) {
  console.error('Application initialization error:', error);
  
  // Render error state if something goes wrong
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
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
