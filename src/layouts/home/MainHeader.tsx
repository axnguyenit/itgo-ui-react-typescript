// routes
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { PATH_AUTH } from '~/routes/paths';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container } from '@mui/material';
// components
import navConfig from './MenuConfig';
import Logo from '~/components/Logo';
import MenuMobile from './MenuMobile';
import MenuDesktop from './MenuDesktop';
import AccountPopover from '../components/account-popover';
// hooks
import { useAuth, useResponsive, useOffSetTop } from '~/hooks';
// utils
import cssStyles from '~/utils/cssStyles';
// config
import { HEADER } from '~/config';

// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);
  const { isAuthenticated } = useAuth();

  const theme = useTheme();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'md');

  const isHome = pathname === '/home';

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
          ...(!isHome && {
            ...cssStyles(theme).bgBlur(),
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo />
          {/* <Searchbar /> */}
          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && (
            <MenuDesktop
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          )}

          {isAuthenticated ? (
            <AccountPopover />
          ) : (
            <Button
              variant='contained'
              to={PATH_AUTH.login}
              component={RouterLink}
            >
              Login
            </Button>
          )}

          {!isDesktop && (
            <MenuMobile
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          )}
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
