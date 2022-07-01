import { MouseEventHandler, useState } from 'react';
// @mui
import {
  MenuItem,
  IconButton,
  DialogTitle,
  Divider,
  DialogActions,
  Button,
  Stack,
  Typography,
  Link,
} from '@mui/material';
// components
import Iconify from '~/components/Iconify';
import MenuPopover from '~/components/MenuPopover';
import { DialogAnimate } from '~/components/animate';
//
import { cloudinary } from '~/utils';

// ----------------------------------------------------------------------

interface ApplicationMoreMenuProps {
  applicationId: string;
  name: string;
  onDeny: () => void;
  onApprove: () => void;
  cv: string;
}

export default function ApplicationMoreMenu({ applicationId, name, onDeny, onApprove, cv }: ApplicationMoreMenuProps) {
  const [open, setOpen] = useState<HTMLButtonElement>();
  const [isOpenModalDeny, setIsOpenModalDeny] = useState<boolean>(false);
  const [isOpenModalApprove, setIsOpenModalApprove] = useState<boolean>(false);

  const handleOpen: MouseEventHandler<HTMLButtonElement> = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(undefined);
  };

  const handleDelete = () => {
    onDeny();
    setIsOpenModalDeny(false);
  };

  const handleApprove = () => {
    onApprove();
    setIsOpenModalDeny(false);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow='right-top'
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem onClick={() => setIsOpenModalApprove(true)} sx={{ color: 'success.main' }}>
          <Iconify icon='icon-park-outline:doc-success' sx={{ ...ICON }} />
          Approve
        </MenuItem>
        <MenuItem component={Link} href={cloudinary.pdf(cv)} sx={{ color: 'info.main' }} target='_blank'>
          <Iconify icon='fluent:document-pdf-20-regular' sx={{ ...ICON }} />
          View CV
        </MenuItem>
        <MenuItem onClick={() => setIsOpenModalDeny(true)} sx={{ color: 'error.main' }}>
          <Iconify icon='eva:close-circle-outline' sx={{ ...ICON }} />
          Deny
        </MenuItem>
      </MenuPopover>

      {/* Modal Deny CV */}
      <DialogAnimate open={isOpenModalDeny} onClose={() => setIsOpenModalDeny(false)}>
        <DialogTitle>Approve user</DialogTitle>
        <Divider sx={{ borderStyle: 'dashed', mt: 2 }} />

        <Stack spacing={3} sx={{ px: 3, py: 2 }}>
          <Typography>
            Are you sure to want to deny permission for this user&nbsp;
            <strong>{`${name}`}</strong>?
          </Typography>
        </Stack>

        <DialogActions>
          <Button variant='outlined' color='inherit' onClick={() => setIsOpenModalDeny(false)}>
            Cancel
          </Button>

          <Button onClick={handleDelete} variant='contained' color='error'>
            Deny
          </Button>
        </DialogActions>
      </DialogAnimate>

      {/* Modal Approve CV */}
      <DialogAnimate open={isOpenModalApprove} onClose={() => setIsOpenModalApprove(false)}>
        <DialogTitle>Approve user</DialogTitle>
        <Divider sx={{ borderStyle: 'dashed', mt: 2 }} />

        <Stack spacing={3} sx={{ px: 3, py: 2 }}>
          <Typography>
            Are you sure to want to grant permission to this user&nbsp;
            <strong>{`${name}`}</strong>?
          </Typography>
        </Stack>

        <DialogActions>
          <Button variant='outlined' color='inherit' onClick={() => setIsOpenModalApprove(false)}>
            Cancel
          </Button>

          <Button onClick={handleApprove} variant='contained' color='success'>
            Approve
          </Button>
        </DialogActions>
      </DialogAnimate>
    </>
  );
}
