import { ReactNode } from 'react';
import { IconifyIcon } from '@iconify/react';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Stack, Theme } from '@mui/material';
// components
import { IconButtonAnimate } from '../animate';
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

const BUTTON_SIZE = 40;

interface ArrowStyleProps {
  filled?: boolean;
  theme: Theme;
}

const ArrowStyle = styled(IconButtonAnimate, {
  shouldForwardProp: (prop) => prop !== 'filled',
})(({ filled = false, theme }: ArrowStyleProps) => ({
  width: BUTTON_SIZE,
  height: BUTTON_SIZE,
  cursor: 'pointer',
  borderRadius: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    color: theme.palette.text.primary,
  },
  ...(filled && {
    opacity: 0.48,
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.grey[900],
    '&:hover': {
      opacity: 1,
      color: theme.palette.common.white,
      backgroundColor: theme.palette.grey[900],
    },
  }),
}));

// ----------------------------------------------------------------------

interface CarouselArrowsProps {
  children: ReactNode;
  customIcon: IconifyIcon | string;
  filled: boolean;
  onNext: () => void;
  onPrevious: () => void;

  [key: string]: any;
}

export default function CarouselArrows({
  filled = false,
  customIcon, // Set icon right
  onNext,
  onPrevious,
  children,
  ...other
}: CarouselArrowsProps) {
  const theme = useTheme();
  const style = {
    position: 'absolute',
    mt: -2.5,
    top: '50%',
    zIndex: 9,
  };

  if (children) {
    return (
      <Box {...other}>
        <Box className="arrow left" sx={{ ...style, left: 0 }}>
          <ArrowStyle onClick={onPrevious} filled theme={theme}>
            {leftIcon(customIcon)}
          </ArrowStyle>
        </Box>

        {children}

        <Box className="arrow right" sx={{ ...style, right: 0 }}>
          <ArrowStyle onClick={onNext} filled theme={theme}>
            {rightIcon(customIcon)}
          </ArrowStyle>
        </Box>
      </Box>
    );
  }

  return (
    <Stack direction="row" spacing={1} {...other}>
      <ArrowStyle
        className="arrow left"
        filled
        onClick={onPrevious}
        theme={theme}
      >
        {leftIcon(customIcon)}
      </ArrowStyle>
      <ArrowStyle className="arrow right" filled onClick={onNext} theme={theme}>
        {rightIcon(customIcon)}
      </ArrowStyle>
    </Stack>
  );
}

// ----------------------------------------------------------------------

const leftIcon = (customIcon: IconifyIcon | string) => (
  <Iconify
    icon={customIcon || 'eva:arrow-right-fill'}
    sx={{
      width: 20,
      height: 20,
      borderRadius: 1,
      transform: ' scaleX(-1)',
    }}
  />
);

const rightIcon = (customIcon: IconifyIcon | string) => (
  <Iconify
    icon={customIcon || 'eva:arrow-right-fill'}
    sx={{
      width: 20,
      height: 20,
      borderRadius: 1,
    }}
  />
);
