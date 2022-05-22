// icons
import { Icon, IconifyIcon } from '@iconify/react';
// @mui
import { Box } from '@mui/material';
import { SxProps, Theme } from '@mui/material';

// ----------------------------------------------------------------------

interface IconifyProps {
  icon: IconifyIcon | string;
  sx?: SxProps<Theme>;

  [key: string]: any;
}

export default function Iconify({ icon, sx, ...other }: IconifyProps) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}
