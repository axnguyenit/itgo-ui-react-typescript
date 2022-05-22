import { Theme } from '@mui/material';

// ----------------------------------------------------------------------

export default function Progress(theme: Theme) {
  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          overflow: 'hidden',
        },
        bar: {
          borderRadius: 4,
        },
        colorPrimary: {
          backgroundColor: theme.palette.primary['lighter'],
        },
        buffer: {
          backgroundColor: 'transparent',
        },
      },
    },
  };
}
