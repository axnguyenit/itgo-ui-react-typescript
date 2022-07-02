import { useEffect, useRef } from 'react';

// ----------------------------------------------------------------------

export function useIsMountedRef() {
  const isMounted = useRef(true);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    [],
  );

  return isMounted;
}
