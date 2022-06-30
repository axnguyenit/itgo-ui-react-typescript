import { MouseEventHandler, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// import ReactPDF, { Canvas, usePDF, PDFViewer, Document } from '@react-pdf/renderer';
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
  Box,
  Tooltip,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '~/routes/paths';
// components
import Iconify from '~/components/Iconify';
import MenuPopover from '~/components/MenuPopover';
import { DialogAnimate } from '~/components/animate';

// ----------------------------------------------------------------------

interface ApplicationMoreMenuProps {
  applicationId: string;
  name: string;
  onDeny: () => void;
  onApprove: () => void;
}

export default function ApplicationMoreMenu({ applicationId, name, onDeny, onApprove }: ApplicationMoreMenuProps) {
  const [open, setOpen] = useState<HTMLButtonElement>();
  const [isOpenModalDeny, setIsOpenModalDeny] = useState<boolean>(false);
  const [isOpenModalApprove, setIsOpenModalApprove] = useState<boolean>(false);
  const [isOpenModalPDFView, setIsOpenModalPDFView] = useState<boolean>(false);

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
        <MenuItem
          component={RouterLink}
          to={`${PATH_DASHBOARD.applications.root}/${applicationId}/cv`}
          sx={{ color: 'info.main' }}
        >
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

      {/* Modal View CV */}
      <DialogAnimate fullScreen open={isOpenModalPDFView} onClose={() => setIsOpenModalPDFView(false)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: '12px !important',
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
            <Tooltip title='Close'>
              <IconButton color='inherit' onClick={() => setIsOpenModalPDFView(false)}>
                <Iconify icon={'eva:close-fill'} />
              </IconButton>
            </Tooltip>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
            {/* <PDFViewer width='100%' height='100%' style={{ border: 'none' }}> */}
            {/* <InvoicePDF invoice={invoice} /> */}
            {/* <Document> */}
            <div></div>
            {/* </Document> */}
            {/* </PDFViewer> */}
          </Box>
        </Box>
        {/* <DialogTitle>Approve user</DialogTitle>
        <Divider sx={{ borderStyle: 'dashed', mt: 2 }} />

        <Stack spacing={3} sx={{ px: 3, py: 2 }}>
          <Typography>
            Are you sure to want to grant permission to this user&nbsp;
            <strong>{`${name}`}</strong>?
          </Typography>
        </Stack>

        <DialogActions>
          <Button variant='outlined' color='inherit' onClick={() => setIsOpenModalPDFView(false)}>
            Cancel
          </Button>

          <Button onClick={handleApprove} variant='contained' color='success'>
            Approve
          </Button>
        </DialogActions> */}
      </DialogAnimate>
    </>
  );
}
