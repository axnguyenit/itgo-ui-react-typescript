import { m } from 'framer-motion';
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
// @mui
import { Box, IconButton, SxProps, Theme } from '@mui/material';

// ----------------------------------------------------------------------
type SizeType = 'small' | 'medium' | 'large';
type ColorType =
  | 'inherit'
  | 'default'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

type IconButtonAnimateProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  size?: SizeType;
  color?: ColorType;
  sx?: SxProps<Theme>;

  [key: string]: any;
};

export default function IconButtonAnimate({
  children,
  size = 'medium',
  color = 'inherit',
  sx = {},
  ...other
}: IconButtonAnimateProps) {
  return (
    <AnimateWrap size={size}>
      <IconButton size={size} {...other}>
        {children}
      </IconButton>
    </AnimateWrap>
  );
}

// ----------------------------------------------------------------------

const varSmall = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
};

const varMedium = {
  hover: { scale: 1.09 },
  tap: { scale: 0.97 },
};

const varLarge = {
  hover: { scale: 1.08 },
  tap: { scale: 0.99 },
};

interface AnimateWrapProps {
  children: ReactNode;
  size?: SizeType;
}

function AnimateWrap({ size = 'medium', children }: AnimateWrapProps) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  return (
    <Box
      component={m.div}
      whileTap='tap'
      whileHover='hover'
      variants={(isSmall && varSmall) || (isLarge && varLarge) || varMedium}
      sx={{
        display: 'inline-flex',
      }}
    >
      {children}
    </Box>
  );
}
