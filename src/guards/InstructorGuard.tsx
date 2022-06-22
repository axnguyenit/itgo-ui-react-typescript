import { ReactNode, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingScreen from '~/components/LoadingScreen';
import Login from '~/pages/auth/Login';
import { useAuth } from '~/hooks';

// ----------------------------------------------------------------------

interface InstructorGuardProps {
  children: ReactNode;
}

export default function InstructorGuard({ children }: InstructorGuardProps) {
  const { user, isAuthenticated, isInitialized } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string>('');

  if (!isInitialized) return <LoadingScreen />;

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) setRequestedLocation(pathname);
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation('');
    return <Navigate to={requestedLocation} />;
  }

  if (!user?.isInstructor) return <Navigate to='/' />;

  return <>{children}</>;
}
