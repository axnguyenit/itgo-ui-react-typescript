import { alpha, Theme } from '@mui/material';

// ----------------------------------------------------------------------

interface BgBlurProps {
  color?: string;
  blur?: number;
  opacity?: number;
}

export default function cssStyles(theme: Theme) {
  return {
    bgBlur: (props?: BgBlurProps) => {
      const color = props?.color || theme?.palette.background.default || '#000000';
      const blur = props?.blur || 6;
      const opacity = props?.opacity || 0.8;

      return {
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`, // Fix on Mobile
        backgroundColor: alpha(color, opacity),
      };
    },
  };
}
