import { useState, useEffect } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
import { Menu } from '@/models';
// components

// ----------------------------------------------------------------------

const LinkStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginRight: theme.spacing(5),
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

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  return (
    <RouterLink to={path} end={path === '/'} style={{ textDecoration: 'none' }}>
      <LinkStyle
        sx={{
          textTransform: 'uppercase',
          ...(isHome && { color: 'common.white' }),
          ...(isOffset && { color: 'text.primary' }),
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
