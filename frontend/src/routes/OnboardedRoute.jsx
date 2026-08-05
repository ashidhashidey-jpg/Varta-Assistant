import { Navigate, Outlet } from 'react-router-dom';
import { useVisitor } from '../context/VisitorContext';

/** Guards /chat — sends first-time visitors to onboarding before they can chat. */
export default function OnboardedRoute() {
  const { isOnboarded } = useVisitor();

  if (!isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}
