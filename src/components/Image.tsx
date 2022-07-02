import { ImgHTMLAttributes } from 'react';
import { Effect, LazyLoadImage } from 'react-lazy-load-image-component';
// @mui
import { Box, SxProps, Theme } from '@mui/material';

// ----------------------------------------------------------------------

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  disabledEffect?: boolean;
  src?: string;
  effect?: Effect;
  ratio?:
    | '4/3'
    | '3/4'
    | '6/4'
    | '4/6'
    | '16/9'
    | '9/16'
    | '21/9'
    | '9/21'
    | '1/1';
  sx?: SxProps<Theme>;

  [key: string]: any;
}

export default function Image({
  ratio,
  src = '',
  disabledEffect = false,
  effect = 'blur',
  sx,
  ...other
}: ImageProps) {
  if (ratio) {
    return (
      <Box
        component="span"
        sx={{
          width: 1,
          lineHeight: 0,
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          pt: getRatio(ratio),
          '& .wrapper': {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            lineHeight: 0,
            position: 'absolute',
            backgroundSize: 'cover !important',
          },
          ...sx,
        }}
        {...other}
      >
        <LazyLoadImage
          wrapperClassName="wrapper"
          effect={disabledEffect ? undefined : effect}
          src={src}
          placeholderSrc="https://zone-assets-api.vercel.app/assets/img_placeholder.svg"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
    );
  }

  return (
    <Box
      component="span"
      sx={{
        lineHeight: 0,
        display: 'block',
        overflow: 'hidden',
        '& .wrapper': {
          width: 1,
          height: 1,
          backgroundSize: 'cover !important',
        },
        ...sx,
      }}
      {...other}
    >
      <LazyLoadImage
        wrapperClassName="wrapper"
        effect={disabledEffect ? undefined : effect}
        src={src}
        placeholderSrc="https://zone-assets-api.vercel.app/assets/img_placeholder.svg"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

function getRatio(ratio = '1/1') {
  return {
    '4/3': 'calc(100% / 4 * 3)',
    '3/4': 'calc(100% / 3 * 4)',
    '6/4': 'calc(100% / 6 * 4)',
    '4/6': 'calc(100% / 4 * 6)',
    '16/9': 'calc(100% / 16 * 9)',
    '9/16': 'calc(100% / 9 * 16)',
    '21/9': 'calc(100% / 21 * 9)',
    '9/21': 'calc(100% / 9 * 21)',
    '1/1': '100%',
  }[ratio];
}
