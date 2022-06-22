import { m } from 'framer-motion';
import { ButtonHTMLAttributes, ReactNode } from 'react';
// @mui
import { Box, IconButton, SxProps, Theme } from '@mui/material';
import { ColorType } from '~/models';

// ----------------------------------------------------------------------
type SizeType = 'small' | 'medium' | 'large';


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
  sx,
  ...other
}: IconButtonAnimateProps) {
  return (
    <AnimateWrap size={size}>
      <IconButton
        size={size}
        sx={{ backgroundColor: 'transparent', ...sx }}
        {...other}
      >
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
