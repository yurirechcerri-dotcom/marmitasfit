import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safe JSON.stringify to handle circular structures and cross-origin frame errors
const originalStringify = JSON.stringify;
JSON.stringify = function(value: any, replacer?: any, space?: any) {
  const cache = new Set();
  try {
    return originalStringify(value, (key: string, val: any) => {
      try {
        // Handle potential cross-origin access errors when checking objects
        if (typeof val === 'object' && val !== null) {
          if (cache.has(val)) return '[Circular]';
          cache.add(val);
        }
        return replacer ? replacer(key, val) : val;
      } catch (e) {
        // If we can't access the object (e.g. cross-origin window), return a placeholder
        return '[Unaccessible]';
      }
    }, space);
  } catch (e) {
    // Fallback for top-level serialization errors
    return '"[Serialization Error]"';
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
