// @mui
// import { styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';
//
import Iconify from '../Iconify';
import { IconButtonAnimate } from '../animate';
import { ReactNode } from 'react';
import { IconifyIcon } from '@iconify/react';

// ----------------------------------------------------------------------

// const BUTTON_SIZE = 40;

// const ArrowStyle = styled(IconButtonAnimate, {
//   shouldForwardProp: (prop) => prop !== 'filled',
// })(({ filled, theme }) => ({
//   width: BUTTON_SIZE,
//   height: BUTTON_SIZE,
//   cursor: 'pointer',
//   borderRadius: '50%',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   '&:hover': {
//     color: theme.palette.text.primary,
//   },
//   ...(filled && {
//     opacity: 0.48,
//     borderRadius: Number(theme.shape.borderRadius) * 1.5,
//     color: theme.palette.common.white,
//     backgroundColor: theme.palette.grey[900],
//     '&:hover': {
//       opacity: 1,
//       color: theme.palette.common.white,
//       backgroundColor: theme.palette.grey[900],
//     },
//   }),
// }));

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
  const style = {
    position: 'absolute',
    mt: -2.5,
    top: '50%',
    zIndex: 9,
  };

  if (children) {
    return (
      <Box {...other}>
        <Box className='arrow left' sx={{ ...style, left: 0 }}>
          <IconButtonAnimate onClick={onPrevious}>
            {leftIcon(customIcon)}
          </IconButtonAnimate>
        </Box>

        {children}

        <Box className='arrow right' sx={{ ...style, right: 0 }}>
          <IconButtonAnimate onClick={onNext}>
            {rightIcon(customIcon)}
          </IconButtonAnimate>
        </Box>
      </Box>
    );
  }

  return (
    <Stack direction='row' spacing={1} {...other}>
      <IconButtonAnimate className='arrow left' onClick={onPrevious}>
        {leftIcon(customIcon)}
      </IconButtonAnimate>
      <IconButtonAnimate className='arrow right' onClick={onNext}>
        {rightIcon(customIcon)}
      </IconButtonAnimate>
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
    }}
  />
);
