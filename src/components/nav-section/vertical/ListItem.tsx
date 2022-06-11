import { ReactNode } from 'react';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { ListItemButton, SxProps, Theme } from '@mui/material';
// config
import { NAVBAR } from '~/config';

// ----------------------------------------------------------------------

interface ListItemProps {
  children: ReactNode;
  activeRoot?: boolean;
  activeSub?: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
  subItem?: boolean;

  [key: string]: any;
}

export default function ListItem({
  children,
  activeRoot = false,
  activeSub = false,
  subItem = false,
  onClick = () => {},
  sx = {},
  ...other
}: ListItemProps) {
  const theme = useTheme();
  return (
    <ListItemButton
      sx={{
        ...theme.typography.body2,
        position: 'relative',
        height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
        textTransform: 'capitalize',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1.5),
        marginBottom: theme.spacing(0.5),
        color: theme.palette.text.secondary,
        borderRadius: theme.shape.borderRadius,
        // activeRoot
        ...(activeRoot && {
          ...theme.typography.subtitle2,
          color: theme.palette.primary.main,
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        }),
        // activeSub
        ...(activeSub && {
          ...theme.typography.subtitle2,
          color: theme.palette.text.primary,
        }),
        // subItem
        ...(subItem && {
          height: NAVBAR.DASHBOARD_ITEM_SUB_HEIGHT,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </ListItemButton>
  );
}
