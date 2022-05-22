import { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Link, useTheme } from '@mui/material';
// config
import { ICON } from '@/config';
//
import { ListItemStyle } from './style';
import { isExternalLink } from '..';
import { MenuItem } from '@/models';
import Iconify from '@/components/Iconify';

// ----------------------------------------------------------------------

interface NavItemRootProps {
  active: boolean;
  open?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  item: MenuItem;
}

export const NavItemRoot = forwardRef(
  (
    {
      item,
      active,
      open = false,
      onMouseEnter,
      onMouseLeave,
    }: NavItemRootProps,
    ref
  ) => {
    const { title, path, icon, children } = item;
    const theme = useTheme();

    if (children) {
      return (
        <ListItemStyle
          open={open}
          activeRoot={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          theme={theme}
          activeSub={false}
          subItem={false}
        >
          <NavItemContent icon={icon} title={title} children={children} />
        </ListItemStyle>
      );
    }

    return isExternalLink(path) ? (
      <Link href={path} target='_blank' rel='noopener'>
        <ListItemStyle
          open={open}
          activeRoot={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          activeSub={false}
          subItem={false}
          theme={theme}
        >
          <NavItemContent icon={icon} title={title} children={children} />
        </ListItemStyle>
      </Link>
    ) : (
      <ListItemStyle component={RouterLink} to={path} activeRoot={active}>
        <NavItemContent icon={icon} title={title} children={children} />
      </ListItemStyle>
    );
  }
);

// ----------------------------------------------------------------------

interface NavItemSubProps {
  active: boolean;
  open?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  item: MenuItem;
}

export const NavItemSub = forwardRef(
  (
    { item, active, open = false, onMouseEnter, onMouseLeave }: NavItemSubProps,
    ref
  ) => {
    const { title, path, icon, children } = item;
    const theme = useTheme();

    if (children) {
      return (
        <ListItemStyle
          subItem={false}
          disableRipple
          activeRoot={active}
          open={open}
          theme={theme}
          activeSub={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <NavItemContent
            icon={icon}
            title={title}
            children={children}
            subItem
          />
        </ListItemStyle>
      );
    }

    return isExternalLink(path) ? (
      <Link href={path} rel='noopener' target='_blank'>
        <ListItemStyle disableRipple subItem theme={theme}>
          <NavItemContent
            icon={icon}
            title={title}
            children={children}
            subItem
          />
        </ListItemStyle>
      </Link>
    ) : (
      <ListItemStyle
        disableRipple
        component={RouterLink}
        to={path}
        activeSub={active}
        subItem
      >
        <NavItemContent icon={icon} title={title} children={children} subItem />
      </ListItemStyle>
    );
  }
);

// ----------------------------------------------------------------------

interface NavItemContentProps {
  icon: any;
  title: string;
  children: MenuItem[];
  subItem?: boolean;
}

function NavItemContent({
  icon,
  title,
  children,
  subItem,
}: NavItemContentProps) {
  return (
    <>
      {/* {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
            '& svg': { width: '100%', height: '100%' },
          }}
        >
          {icon}
        </Box>
      )} */}
      {title}
      {children && (
        <Iconify
          icon={subItem ? 'eva:chevron-right-fill' : 'eva:chevron-down-fill'}
          sx={{
            ml: 0.5,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
          }}
        />
      )}
    </>
  );
}
