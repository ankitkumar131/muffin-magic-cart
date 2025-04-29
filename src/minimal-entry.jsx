import React from 'react';
import ReactDOM from 'react-dom/client';
import SimpleApp from './SimpleApp';
import './index.css';

try {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <SimpleApp />
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