import React from 'react';
import ReactDOM from 'react-dom/client';
import AppBridge from './AppBridge';
import './index.css';

// This entry point will try to load the original App
// If it fails due to path alias issues, it will show the SimpleApp
try {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <AppBridge />
      </React.StrictMode>
    );
  }
} catch (error) {
  console.error('Error starting app:', error);
  document.getElementById('root').innerHTML = 
    `<div style="color:red;padding:20px;">
      <h2>Error Starting Application</h2>
      <p>${error.message}</p>
      <button onclick="location.reload()">Reload</button>
    </div>`;
}
