import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, ListItemText, ListItemIcon } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
// components
import ListItem from './ListItem';
import Iconify from '~/components/Iconify';
//
import { ICON } from '~/config';
import { MenuItem } from '~/models';

// ----------------------------------------------------------------------

export const ListItemIconStyle = styled(ListItemIcon)({
  width: ICON.NAVBAR_ITEM,
  height: ICON.NAVBAR_ITEM,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': { width: '100%', height: '100%' },
  borderRadius: 1,
});

interface NavItemRootProps {
  active: boolean;
  open?: boolean;
  isCollapse: boolean;
  onOpen?: () => void;
  item: MenuItem;
}

export function NavItemRoot({
  item,
  isCollapse,
  open = false,
  active,
  onOpen = () => {},
}: NavItemRootProps) {
  const { title, path, icon, children } = item;
  const theme = useTheme();

  const renderContent = (
    <>
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}

      <ListItemText
        disableTypography
        primary={title}
        sx={{
          whiteSpace: 'nowrap',
          textDecoration: 'none',
          transition: theme.transitions.create(['width', 'opacity'], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(isCollapse && {
            width: 0,
            opacity: 0,
          }),
        }}
      />

      {!isCollapse && <>{children && <ArrowIcon open={open} />}</>}
    </>
  );

  if (children) {
    return (
      <>
        <ListItem onClick={onOpen} activeRoot={active}>
          {renderContent}
        </ListItem>
      </>
    );
  }

  return (
    <RouterLink to={path} style={{ textDecoration: 'none' }}>
      <ListItem activeRoot={active}>{renderContent}</ListItem>
    </RouterLink>
  );
}

// ----------------------------------------------------------------------

interface NavItemSubProps {
  active?: boolean;
  open?: boolean;
  onOpen?: () => void;
  item: MenuItem;
}

export function NavItemSub({
  item,
  open = false,
  active = false,
  onOpen = () => {},
}: NavItemSubProps) {
  const { title, path, children } = item;

  const renderContent = (
    <>
      <DotIcon active={active} />
      <ListItemText disableTypography primary={title} />
      {children && <ArrowIcon open={open} />}
    </>
  );

  if (children) {
    return (
      <ListItem onClick={onOpen} activeSub={active} subItem>
        {renderContent}
      </ListItem>
    );
  }

  return (
    <RouterLink to={path} style={{ textDecoration: 'none' }}>
      <ListItem activeSub={active} subItem>
        {renderContent}
      </ListItem>
    </RouterLink>
  );
}

// ----------------------------------------------------------------------

interface DotIconProps {
  active: boolean;
}

export function DotIcon({ active }: DotIconProps) {
  return (
    <ListItemIconStyle>
      <Box
        component='span'
        sx={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'text.disabled',
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: 'scale(2)',
            bgcolor: 'primary.main',
          }),
        }}
      />
    </ListItemIconStyle>
  );
}

// ----------------------------------------------------------------------

interface ArrowIconProps {
  open: boolean;
}

export function ArrowIcon({ open }: ArrowIconProps) {
  return (
    <Iconify
      icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
      sx={{ width: 16, height: 16, ml: 1 }}
    />
  );
}
