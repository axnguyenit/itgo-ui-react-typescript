import LoadingScreen from '~/components/LoadingScreen';
import { PATH_AUTH } from '~/routes/paths';
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '~/hooks';

export interface BasedGuardProps {
  children: ReactNode;
}

export default function BasedGuard({ children }: BasedGuardProps) {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to={PATH_AUTH.login} replace />;
  return <>{children}</>;
}
