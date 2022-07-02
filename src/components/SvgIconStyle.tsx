import { Box, SxProps, Theme } from '@mui/material';

// ----------------------------------------------------------------------

interface SvgIconStyleProps {
  src: string;
  sx?: SxProps<Theme>;
}

export default function SvgIconStyle({ src, sx }: SvgIconStyleProps) {
  return (
    <Box
      component="span"
      sx={{
        width: 24,
        height: 24,
        display: 'inline-block',
        bgcolor: 'currentColor',
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
    />
  );
}
