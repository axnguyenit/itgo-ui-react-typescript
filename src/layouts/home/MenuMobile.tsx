import { useState, useEffect } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import {
  // Box,
  List,
  Drawer,
  // Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from '@mui/material';
// config
import { NAVBAR } from '~/config';
// components
import Logo from '~/components/Logo';
import Iconify from '~/components/Iconify';
import Scrollbar from '~/components/Scrollbar';
import { IconButtonAnimate } from '~/components/animate';
// import { NavSectionVertical } from '~/components/nav-section';
import { Menu } from '~/models';

// ----------------------------------------------------------------------

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
  textTransform: 'capitalize',
  backgroundColor: 'inherit',
  // color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

interface MenuMobileProps {
  isOffset: boolean;
  isHome: boolean;
  navConfig: Menu[];
}

export default function MenuMobile({
  isOffset,
  isHome,
  navConfig,
}: MenuMobileProps) {
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <IconButtonAnimate onClick={handleDrawerOpen} sx={{ ml: 1 }}>
        <Iconify
          icon='eva:menu-2-fill'
          sx={{
            ...(isHome && { color: 'common.white' }),
            ...(isOffset && { color: 'text.primary' }),
          }}
        />
      </IconButtonAnimate>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List disablePadding>
            {navConfig.map((link) => (
              <MenuMobileItem
                key={link.title}
                item={link}
                isOpen={open}
                onOpen={handleOpen}
              />
            ))}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

interface MenuMobileItemProps {
  isOpen: boolean;
  item: Menu;
  onOpen: () => void;
}

function MenuMobileItem({ item, isOpen, onOpen }: MenuMobileItemProps) {
  const { title, path, icon } = item;

  const theme = useTheme();

  // if (children) {
  //   return (
  //     <>
  //       <ListItemStyle onClick={onOpen}>
  //         <ListItemIcon>{icon}</ListItemIcon>
  //         <ListItemText disableTypography primary={title} />
  //         <Iconify
  //           icon={
  //             isOpen
  //               ? 'eva:arrow-ios-downward-fill'
  //               : 'eva:arrow-ios-forward-fill'
  //           }
  //           sx={{ width: 16, height: 16, ml: 1 }}
  //         />
  //       </ListItemStyle>

  //       <Collapse in={isOpen} timeout='auto' unmountOnExit>
  //         <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
  //           <NavSectionVertical navConfig={children} />
  //         </Box>
  //       </Collapse>
  //     </>
  //   );
  // }

  return (
    <RouterLink
      to={path}
      end={path === '/'}
      style={({ isActive }) => ({
        textDecoration: 'none',
        color: isActive
          ? theme.palette.primary.main
          : theme.palette.text.secondary,
        backgroundColor: isActive
          ? alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity
            )
          : theme.palette.background.default,
      })}
    >
      <ListItemStyle
        sx={{
          '&.active': {
            color: 'primary.main',
            fontWeight: 'fontWeightMedium',
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.selectedOpacity
              ),
          },
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText disableTypography primary={title} />
      </ListItemStyle>
    </RouterLink>
  );
}
