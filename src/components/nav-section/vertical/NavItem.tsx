import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link, LinkBaseProps, ListItemText } from '@mui/material';
//
import { ListItemStyle, ListItemTextStyle, ListItemIconStyle } from './style';
import { isExternalLink } from '..';
import { MenuConfigItem } from '@/models';
import { forwardRef } from 'react';
import Iconify from '@/components/Iconify';

// ----------------------------------------------------------------------

interface NavItemRootProps {
  active: boolean;
  open?: boolean;
  isCollapse: boolean;
  onOpen?: () => void;
  item: MenuConfigItem;
}

export function NavItemRoot({
  item,
  isCollapse,
  open = false,
  active,
  onOpen,
}: NavItemRootProps) {
  const { title, path, icon, children } = item;

  const renderContent = (
    <>
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
      <ListItemTextStyle
        disableTypography
        primary={title}
        isCollapse={isCollapse}
      />
      {!isCollapse && <>{children && <ArrowIcon open={open} />}</>}
    </>
  );

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeRoot={active}>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle component={Link} href={path} target='_blank' rel='noopener'>
      {renderContent}
    </ListItemStyle>
  ) : (
    <ListItemStyle component={RouterLink} to={path} activeRoot={active}>
      {renderContent}
    </ListItemStyle>
  );
}

// ----------------------------------------------------------------------

interface NavItemSubProps {
  active?: boolean;
  open?: boolean;
  onOpen?: () => void;
  item: MenuConfigItem;
}

export function NavItemSub({
  item,
  open = false,
  active = false,
  onOpen,
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
      <ListItemStyle onClick={onOpen} activeSub={active} subItem>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle
      component={Link}
      href={path}
      target='_blank'
      rel='noopener'
      subItem
    >
      {renderContent}
    </ListItemStyle>
  ) : (
    <ListItemStyle component={RouterLink} to={path} activeSub={active} subItem>
      {renderContent}
    </ListItemStyle>
  );
}

// ----------------------------------------------------------------------

export function DotIcon({ active }: { active: boolean }) {
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

export function ArrowIcon({ open }: { open: boolean }) {
  return (
    <Iconify
      icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
      sx={{ width: 16, height: 16, ml: 1 }}
    />
  );
}
