import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Create root element for React 18
const root = createRoot(document.getElementById('root'));

// Render your app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Remove performance measuring call
// reportWebVitals();
