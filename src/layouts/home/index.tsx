import { Outlet } from 'react-router-dom';
// @mui
import { Box, Stack } from '@mui/material';
// components
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';
import { CartWidget } from '~/sections/home';

// ----------------------------------------------------------------------

export default function HomeLayout() {
  return (
    <Stack sx={{ minHeight: 1 }}>
      <MainHeader />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <CartWidget />
      <MainFooter />
    </Stack>
  );
}
