import { useState, useEffect } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
//
import { Menu } from '~/models';
import { getActive } from '~/utils';

// ----------------------------------------------------------------------

const LinkStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginRight: theme.spacing(5),
  textTransform: 'uppercase',
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    opacity: 0.48,
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
}));

// ----------------------------------------------------------------------

interface MenuDesktopProps {
  isHome: boolean;
  isOffset: boolean;
  navConfig: Menu[];
}

export default function MenuDesktop({
  isOffset,
  isHome,
  navConfig,
}: MenuDesktopProps) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    open && handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Stack direction='row'>
      {navConfig.map((link) => (
        <MenuDesktopItem
          key={link.title}
          item={link}
          isOpen={open}
          onOpen={handleOpen}
          onClose={handleClose}
          isOffset={isOffset}
          isHome={isHome}
        />
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------

interface MenuDesktopItemProps {
  isHome: boolean;
  isOffset: boolean;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  item: Menu;
}

function MenuDesktopItem({
  item,
  isHome,
  isOpen,
  isOffset,
  onOpen,
  onClose,
}: MenuDesktopItemProps) {
  const { title, path } = item;
  const { pathname } = useLocation();

  const active = getActive(path, pathname);

  return (
    <RouterLink to={path} end={path === '/'} style={{ textDecoration: 'none' }}>
      <LinkStyle
        sx={{
          fontWeight: '600',
          textTransform: 'uppercase',
          ...(isHome && { color: 'common.white' }),
          ...(isOffset && { color: 'text.primary' }),
          ...(active && { color: 'primary.main' }),
          '&.active': {
            color: 'primary.main',
          },
        }}
      >
        {title}
      </LinkStyle>
    </RouterLink>
  );
}
