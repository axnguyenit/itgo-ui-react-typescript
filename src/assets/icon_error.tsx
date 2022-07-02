import React from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

export default function ErrorIcon({ ...other }) {
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;

  return (
    <Box {...other}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 36 36"
      >
        <path
          fill={PRIMARY_MAIN}
          d="M18 2.1a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm-1.4 6.7a1.4 1.4 0 0 1 2.8 0v12a1.4 1.4 0 0 1-2.8 0ZM18 28.6a1.8 1.8 0 1 1 1.8-1.8a1.8 1.8 0 0 1-1.8 1.8Z"
          className="clr-i-solid clr-i-solid-path-1"
        />
        <path fill="none" d="M0 0h36v36H0z" />
      </svg>
    </Box>
  );
}
