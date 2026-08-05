import axios from 'axios';
import toast from 'react-hot-toast';

// Base URL resolution:
// - VITE_API_BASE_URL lets you point straight at the backend (e.g. in production
//   if the frontend is hosted separately from the Express server).
// - Empty string keeps requests relative ("/api/..."), which works when the
//   Vite dev server proxy (vite.config.js) or the backend's own static file
//   serving (server.js) is fronting the app.
const baseURL = import.meta.env.VITE_API_BASE_URL || '';

export const api = axios.create({
  baseURL,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor — placeholder hook for attaching auth headers later
// (e.g. once the backend gains a real /api/admin/login endpoint).
api.interceptors.request.use((config) => {
  const adminToken = window.localStorage.getItem('varta_admin_token');
  if (adminToken && config.url?.startsWith('/api') && !config.url.includes('/widget/')) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }
  return config;
});

// Response interceptor — normalizes error messages so every screen can rely
// on `error.message` being something safe to show a user.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.error;

    if (!error.response) {
      error.message = 'Cannot reach the Varta backend. Check your connection and try again.';
    } else if (status === 429) {
      error.message = serverMessage || 'Too many requests — please slow down a little.';
    } else if (status >= 500) {
      error.message = serverMessage || 'Something went wrong on the server. Please try again.';
    } else {
      error.message = serverMessage || error.message || 'Something went wrong.';
    }

    return Promise.reject(error);
  }
);

/** Shared helper for surfacing API errors via toast without repeating logic everywhere. */
export function notifyApiError(error, fallback = 'Something went wrong.') {
  toast.error(error?.message || fallback);
}

export default api;
