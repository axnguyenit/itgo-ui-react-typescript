import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Stack, Avatar, SxProps, Theme } from '@mui/material';

// ----------------------------------------------------------------------

interface LogoProps {
  disabledLink?: boolean;
  sx?: SxProps<Theme>;
}

export default function Logo({ disabledLink = false, sx }: LogoProps) {
  const logo = (
    <Stack sx={{ width: 45, height: 45, ...sx }}>
      <Avatar
        src="/assets/images/logo.png"
        sx={{ width: 'inherit', height: 'inherit' }}
        alt="ITGO"
      />
    </Stack>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
