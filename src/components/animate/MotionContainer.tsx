import { ReactNode } from 'react';
import { m } from 'framer-motion';
// @mui
import { Box } from '@mui/material';
//
import { varContainer } from './variants';

// ----------------------------------------------------------------------

interface MotionContainerProps {
  action?: boolean;
  animate?: boolean;
  children: ReactNode;

  [key: string]: any;
}

export default function MotionContainer({
  animate = false,
  action = false,
  children,
  ...other
}: MotionContainerProps) {
  if (action) {
    return (
      <Box
        component={m.div}
        initial={false}
        animate={animate ? 'animate' : 'exit'}
        variants={varContainer({ staggerIn: 0.05 })}
        {...other}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      component={m.div}
      initial='initial'
      animate='animate'
      exit='exit'
      variants={varContainer({ staggerIn: 0.05 })}
      {...other}
    >
      {children}
    </Box>
  );
}
