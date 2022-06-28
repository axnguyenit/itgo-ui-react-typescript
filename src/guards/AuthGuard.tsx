import { ReactNode, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import { useAuth } from '~/hooks';
// pages
import Login from '~/pages/auth/Login';
// components
import LoadingScreen from '~/components/LoadingScreen';

// ----------------------------------------------------------------------

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, isAuthenticated, isInitialized } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string>('');

  if (!isInitialized) return <LoadingScreen />;

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation('');
    return <Navigate to={requestedLocation} />;
  }

  if (!user?.isAdmin) return <Navigate to='/' replace />;

  return <>{children}</>;
}
