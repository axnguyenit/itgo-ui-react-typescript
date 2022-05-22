import { Theme } from '@mui/material';

// ----------------------------------------------------------------------

export default function Input(theme: Theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: theme.palette.secondary.main,
            '& svg': { color: theme.palette.text.disabled },
          },
          '&-MuiOutlinedInput-root': {},
        },
        input: {
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:hover:not(.Mui-disabled):before': {
            borderBottomColor: theme.palette.primary.main,
          },
        },
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[50056],
            '&:hover': {
              borderBottomColor: theme.palette.primary.main,
            },
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[500_12],
          '&:hover': {
            backgroundColor: theme.palette.grey[500_16],
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.action.focus,
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottomColor: theme.palette.primary.main,
          },
        },
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56],
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
          '&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[50032],
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
        },
      },
    },
  };
}
