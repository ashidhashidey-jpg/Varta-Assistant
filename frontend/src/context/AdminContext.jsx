import { createContext, useContext, useState, useCallback } from 'react';

const AdminContext = createContext(undefined);

const TOKEN_KEY = 'varta_admin_token';

// IMPORTANT: the backend (server.js) does not currently expose a real
// /api/admin/login endpoint — config.ADMIN_PASSWORD is only ever logged to
// the server console. Until a signed-session endpoint exists, this is a
// client-side password gate, not real authentication. It keeps casual
// visitors out of the dashboard, but anyone reading the JS bundle can find
// the configured password. Swap this for a real backend check when you can.
const EXPECTED_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => window.localStorage.getItem(TOKEN_KEY) === 'granted'
  );
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (password) => {
    setIsLoading(true);
    try {
      // Simulated latency so the login screen's loading state feels real,
      // and so this is a single seam to swap for a real API call later.
      await new Promise((resolve) => setTimeout(resolve, 350));
      const ok = password === EXPECTED_PASSWORD;
      if (ok) {
        window.localStorage.setItem(TOKEN_KEY, 'granted');
        setIsAuthenticated(true);
      }
      return ok;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(TOKEN_KEY);
    setIsAuthenticated(false);
  }, []);

  return (
    <AdminContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within an AdminProvider');
  return ctx;
}
