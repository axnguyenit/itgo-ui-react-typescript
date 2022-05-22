import { Theme } from '@mui/material';

// ----------------------------------------------------------------------

export default function Link(theme: Theme) {
  return {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
  };
}
