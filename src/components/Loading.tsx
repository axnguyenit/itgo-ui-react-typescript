import React from 'react';
import { m } from 'framer-motion';
import { Box, styled } from '@mui/material';

const RootStyle = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 99999,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

export default function Loading() {
  return (
    <RootStyle>
      <Box
        sx={{ width: 28, height: 28, bgcolor: 'primary.main' }}
        component={m.div}
        initial={{ rotate: 0 }}
        animate={{
          rotateX: [180, 0, 0, 0],
          rotateY: [0, 0, 0, 180],
        }}
        transition={{
          duration: 0.75,
          repeatDelay: 0.5,
          repeat: Infinity,
        }}
      />
    </RootStyle>
  );
}
