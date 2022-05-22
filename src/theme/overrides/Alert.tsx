import { Theme } from '@mui/material';
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from './CustomIcons';

// ----------------------------------------------------------------------

export default function Alert(theme: Theme) {
  const standardStyle = (color) => ({
    color: theme.palette[color]['darker'],
    backgroundColor: theme.palette[color]['lighter'],
    '& .MuiAlert-icon': {
      color: theme.palette[color]['main'],
    },
  });

  const filledStyle = (color) => ({
    color: theme.palette[color].contrastText,
  });

  const outlinedStyle = (color) => ({
    color: theme.palette[color]['darker'],
    border: `solid 1px ${theme.palette[color]['light']}`,
    backgroundColor: theme.palette[color]['lighter'],
    '& .MuiAlert-icon': {
      color: theme.palette[color]['main'],
    },
  });

  return {
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          info: <InfoIcon />,
          success: <SuccessIcon />,
          warning: <WarningIcon />,
          error: <ErrorIcon />,
        },
      },

      styleOverrides: {
        message: {
          '& .MuiAlertTitle-root': {
            marginBottom: theme.spacing(0.5),
          },
        },
        action: {
          '& button:not(:first-of-type)': {
            marginLeft: theme.spacing(1),
          },
        },

        standardInfo: standardStyle('info'),
        standardSuccess: standardStyle('success'),
        standardWarning: standardStyle('warning'),
        standardError: standardStyle('error'),

        filledInfo: filledStyle('info'),
        filledSuccess: filledStyle('success'),
        filledWarning: filledStyle('warning'),
        filledError: filledStyle('error'),

        outlinedInfo: outlinedStyle('info'),
        outlinedSuccess: outlinedStyle('success'),
        outlinedWarning: outlinedStyle('warning'),
        outlinedError: outlinedStyle('error'),
      },
    },
  };
}
