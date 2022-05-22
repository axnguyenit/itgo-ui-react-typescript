import { Theme } from '@mui/material';

// ----------------------------------------------------------------------

export default function Switch(theme: Theme) {
  return {
    MuiSwitch: {
      styleOverrides: {
        thumb: {
          boxShadow: theme.customShadows.z1,
        },
        track: {
          opacity: 1,
          backgroundColor: theme.palette.grey[500],
        },
        switchBase: {
          left: 0,
          right: 'auto',
          '&:not(:.Mui-checked)': {
            color: theme.palette.grey[100],
          },
          '&.Mui-checked.Mui-disabled, &.Mui-disabled': {
            color: theme.palette.grey[400],
          },
          '&.Mui-disabled+.MuiSwitch-track': {
            opacity: 1,
            backgroundColor: `${theme.palette.action.disabledBackground} !important`,
          },
        },
      },
    },
  };
}
