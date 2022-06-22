import { useContext } from 'react';
import { CollapseDrawerContext } from '~/contexts';

// ----------------------------------------------------------------------

export function useCollapseDrawer() {
  const context = useContext(CollapseDrawerContext);

  if (!context)
    throw new Error(
      'CollapseDrawer context must be inside CollapseDrawerProvider'
    );

  return context;
}
