import React from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

export default function SuccessIcon({ ...other }) {
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
        viewBox="0 0 16 16"
      >
        <g
          fill="none"
          stroke={PRIMARY_MAIN}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        >
          <path d="M14.25 8.75c-.5 2.5-2.385 4.854-5.03 5.38A6.25 6.25 0 0 1 3.373 3.798C5.187 1.8 8.25 1.25 10.75 2.25" />
          <path d="m5.75 7.75l2.5 2.5l6-6.5" />
        </g>
      </svg>
    </Box>
  );
}
