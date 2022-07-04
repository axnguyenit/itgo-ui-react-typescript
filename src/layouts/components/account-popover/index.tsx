import { MouseEvent, useState } from 'react';
import { useSnackbar } from 'notistack';
// @mui
import {
  Box,
  Divider,
  MenuItem,
  Stack,
  Typography,
  Theme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
// router
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  PATH_AUTH,
  PATH_DASHBOARD,
  PATH_HOME,
  PATH_INSTRUCTOR,
} from '~/routes/paths';
// components
import { IconButtonAnimate } from '~/components/animate';
import MenuPopover from '~/components/MenuPopover';
import MyAvatar from '~/components/MyAvatar';
// hooks
import { useAppDispatch, useAuth } from '~/hooks';
// redux
import { resetCart } from '~/redux/slices/cart';
//
import { setSession } from '~/utils';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  // {
  //   label: 'Home',
  //   linkTo: '/',
  // },
  {
    label: 'Account',
    linkTo: PATH_HOME.account,
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, dispatch: authDispatch } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    setOpen(e.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    try {
      setSession(null, null);
      authDispatch({ type: 'LOGOUT', payload: { user: null } });
      dispatch(resetCart());
      navigate(PATH_AUTH.login, { replace: true });
      handleClose();
    } catch (error) {
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme: Theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <MyAvatar />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {`${user?.firstName} ${user?.lastName}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))}
          {(user?.isInstructor || user?.isAdmin) && (
            <MenuItem
              to={PATH_INSTRUCTOR.root}
              component={RouterLink}
              onClick={handleClose}
            >
              Instructor
            </MenuItem>
          )}
          {user?.isAdmin && (
            <MenuItem
              to={PATH_DASHBOARD.root}
              component={RouterLink}
              onClick={handleClose}
            >
              Dashboard
            </MenuItem>
          )}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
