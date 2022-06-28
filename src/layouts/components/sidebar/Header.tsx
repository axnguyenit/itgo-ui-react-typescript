// @mui
import { AppBar, Box, Stack, Theme, Toolbar } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
// components
import { IconButtonAnimate } from '~/components/animate';
import Iconify from '~/components/Iconify';
import Logo from '~/components/Logo';
import AccountPopover from '~/layouts/components/account-popover';
// config
import { HEADER, NAVBAR } from '~/config';
// hooks
import { useOffSetTop, useResponsive } from '~/hooks';
// utils
import { cssStyles } from '~/utils';

// ----------------------------------------------------------------------

interface RootStyleProps {
  isCollapse: boolean;
  isOffset: boolean;
  verticalLayout: boolean;
  theme: Theme;
}

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({ isCollapse, isOffset, verticalLayout, theme }: RootStyleProps) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

// ----------------------------------------------------------------------

interface HeaderProps {
  onOpenSidebar: () => void;
  isCollapse: boolean;
  verticalLayout?: boolean;
}

export default function Header({
  onOpenSidebar,
  isCollapse = false,
  verticalLayout = false,
}: HeaderProps) {
  const isOffset =
    useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive('up', 'lg');
  const theme = useTheme();

  return (
    <RootStyle
      isCollapse={isCollapse}
      isOffset={isOffset}
      verticalLayout={verticalLayout}
      theme={theme}
    >
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 5 },
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

        {!isDesktop && (
          <IconButtonAnimate
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: 'text.primary' }}
          >
            <Iconify icon='eva:menu-2-fill' />
          </IconButtonAnimate>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction='row'
          alignItems='center'
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <AccountPopover />
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
