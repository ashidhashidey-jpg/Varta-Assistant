import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

/** Guards /admin/* routes. Redirects to the login screen, remembering where to return. */
export default function ProtectedRoute() {
  const { isAuthenticated } = useAdmin();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
