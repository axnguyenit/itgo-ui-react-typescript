import { Theme } from '@mui/material';

// ----------------------------------------------------------------------

export default function Badge(theme: Theme) {
  return {
    MuiBadge: {
      styleOverrides: {
        dot: {
          width: 10,
          height: 10,
          borderRadius: '50%',
        },
      },
    },
  };
}
