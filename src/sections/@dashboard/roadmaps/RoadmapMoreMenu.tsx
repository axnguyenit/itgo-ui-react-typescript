import { MouseEventHandler, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '~/routes/paths';
// components
import Iconify from '~/components/Iconify';
import MenuPopover from '~/components/MenuPopover';
import { DialogAnimate } from 'src/components/animate';

// ----------------------------------------------------------------------

interface RoadmapMoreMenuProps {
  roadmapId: string;
  roadmapName: string;
  onDelete: () => void;
}

export default function RoadmapMoreMenu({
  roadmapId,
  roadmapName,
  onDelete,
}: RoadmapMoreMenuProps) {
  const [open, setOpen] = useState<HTMLButtonElement>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleOpen: MouseEventHandler<HTMLButtonElement> = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(undefined);
  };

  const handleDelete = () => {
    onDelete();
    setIsOpenModal(false);
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
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <MenuItem
          component={RouterLink}
          to={`${PATH_DASHBOARD.roadmaps.root}/${roadmapId}/edit`}
        >
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => setIsOpenModal(true)}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Delete
        </MenuItem>
      </MenuPopover>

      <DialogAnimate open={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <DialogTitle>Delete roadmap</DialogTitle>
        <Divider sx={{ borderStyle: 'dashed', mt: 2 }} />

        <Stack spacing={3} sx={{ px: 3, py: 2 }}>
          <Typography>
            Are you sure to want to permanently delete this roadmap&nbsp;
            <strong>{`${roadmapName}`}</strong>?
          </Typography>
        </Stack>

        <DialogActions>
          <Button
            variant='outlined'
            color='inherit'
            onClick={() => setIsOpenModal(false)}
          >
            Cancel
          </Button>

          <Button onClick={handleDelete} variant='contained' color='error'>
            Delete
          </Button>
        </DialogActions>
      </DialogAnimate>
    </>
  );
}
