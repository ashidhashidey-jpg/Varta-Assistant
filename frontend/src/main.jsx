import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ErrorBoundary from './utils/ErrorBoundary.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { VisitorProvider } from './context/VisitorContext.jsx';
import { AdminProvider } from './context/AdminContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ThemeProvider>
          <VisitorProvider>
            <AdminProvider>
              <App />
            </AdminProvider>
          </VisitorProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);