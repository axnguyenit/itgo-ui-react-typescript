import React, { ReactNode } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar as MUIAvatar, SxProps, Theme } from '@mui/material';

// ----------------------------------------------------------------------

interface AvatarProps {
  src?: string;
  alt?: string;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

export default function Avatar({
  src,
  alt,
  color = 'default',
  children,
  sx,
  ...other
}: AvatarProps) {
  const theme = useTheme();

  if (color === 'default') {
    return (
      <MUIAvatar src={src} sx={sx} {...other}>
        {children}
      </MUIAvatar>
    );
  }

  return (
    <MUIAvatar
      src={src}
      sx={{
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette[color].contrastText,
        backgroundColor: theme.palette[color].main,
        ...sx,
      }}
      {...other}
    >
      {children}
    </MUIAvatar>
  );
}
