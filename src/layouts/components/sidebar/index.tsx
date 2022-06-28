import { useState } from 'react';
// @mui
import { Box, Theme } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
// components
import Header from './Header';
import Navbar from './Navbar';
// hooks
import { useCollapseDrawer } from '~/hooks';
//
import { HEADER, NAVBAR } from '~/config';
import { SubMenu } from '~/models';

// ----------------------------------------------------------------------

interface MainStyleProps {
  collapseClick: boolean;
  theme: Theme;
}

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ collapseClick, theme }: MainStyleProps) => ({
  flexGrow: 1,
  paddingTop: HEADER.MOBILE_HEIGHT + 24,
  paddingBottom: HEADER.MOBILE_HEIGHT + 24,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme.transitions.create('margin-left', {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}));

// ----------------------------------------------------------------------

interface SidebarProps {
  navConfig: SubMenu[];
}

export default function Sidebar({ navConfig }: SidebarProps) {
  const { collapseClick, isCollapse } = useCollapseDrawer();
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: { lg: 'flex' },
        minHeight: { lg: 1 },
      }}
    >
      <Header isCollapse={isCollapse} onOpenSidebar={() => setOpen(true)} />
      <Navbar
        isOpenSidebar={open}
        navConfig={navConfig}
        onCloseSidebar={() => setOpen(false)}
      />
      <MainStyle collapseClick={collapseClick} theme={theme}>
        <Outlet />
      </MainStyle>
    </Box>
  );
}
