import { Breakpoint, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ----------------------------------------------------------------------

export function useResponsive(query: string, key: Breakpoint | number) {
  const theme = useTheme();
  const mediaUp = useMediaQuery(theme.breakpoints.up(key));
  const mediaDown = useMediaQuery(theme.breakpoints.down(key));

  if (query === 'up') return mediaUp;
  if (query === 'down') return mediaDown;

  return null;
}
