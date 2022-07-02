import { MouseEventHandler, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { MenuItem, IconButton } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '~/routes/paths';
// components
import Iconify from '~/components/Iconify';
import MenuPopover from '~/components/MenuPopover';

// ----------------------------------------------------------------------

interface InstructorMoreMenuProps {
  userId: string;
}

export default function InstructorMoreMenu({
  userId,
}: InstructorMoreMenuProps) {
  const [open, setOpen] = useState<HTMLButtonElement>();

  const handleOpen: MouseEventHandler<HTMLButtonElement> = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(undefined);
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
        arrow="right-top"
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
          to={`${PATH_DASHBOARD.instructors.root}/${userId}/courses`}
        >
          <Iconify icon="el:book" sx={{ ...ICON }} />
          Courses
        </MenuItem>
      </MenuPopover>
    </>
  );
}
