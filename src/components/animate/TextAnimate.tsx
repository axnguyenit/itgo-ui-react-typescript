import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { Box, SxProps, Theme } from '@mui/material';
//
import { varFade } from './variants';

// ----------------------------------------------------------------------

TextAnimate.propTypes = {
  text: PropTypes.string.isRequired,
  variants: PropTypes.object,
  sx: PropTypes.object,
};

interface TextAnimateProps {
  text: string;
  variants?: any;
  sx: SxProps<Theme>;

  [key: string]: any;
}

export default function TextAnimate({
  text,
  variants,
  sx,
  ...other
}: TextAnimateProps) {
  return (
    <Box
      component={m.h1}
      sx={{
        typography: 'h1',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade({}).inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}
