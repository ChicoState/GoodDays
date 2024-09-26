import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    const renderer= createRoot(root);

    renderer.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
});
