import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { JournalProvider } from './JournalContext';
import { HashRouter } from 'react-router-dom';

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    const renderer = createRoot(root);

    renderer.render(
        <React.StrictMode>
            <JournalProvider>
                <HashRouter>
                    <App />
                </HashRouter>
            </JournalProvider>
        </React.StrictMode>
    );
});
