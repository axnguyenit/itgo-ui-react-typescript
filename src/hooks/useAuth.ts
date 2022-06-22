import { useContext } from 'react';
import { AuthContext } from '~/contexts';

// ----------------------------------------------------------------------

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error('Auth context must be inside AuthProvider');

  return context;
}
