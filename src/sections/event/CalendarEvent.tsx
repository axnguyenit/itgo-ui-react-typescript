import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Stack,
  Button,
  DialogActions,
  Typography,
  DialogTitle,
} from '@mui/material';
import { fDateTime } from '~/utils';
import { PATH_HOME } from '~/routes/paths';
import { Event } from '~/models';

// ----------------------------------------------------------------------

interface CalendarEventProps {
  event: Event | undefined;
  onCancel: () => void;
}

export default function CalendarEvent({ event, onCancel }: CalendarEventProps) {
  return (
    <>
      <DialogTitle>Event</DialogTitle>

      <Stack spacing={3} sx={{ p: 3 }}>
        <Box>
          <Typography variant='h6' sx={{ color: 'text.disabled' }}>
            Title
          </Typography>
          <Typography variant='body2'>{event?.title}</Typography>
        </Box>

        <Box>
          <Typography variant='h6' sx={{ color: 'text.disabled' }}>
            Description
          </Typography>
          <Typography variant='body2'>{event?.description}</Typography>
        </Box>

        <Box>
          <Typography variant='h6' sx={{ color: 'text.disabled' }}>
            Start
          </Typography>
          <Typography variant='body2'>
            {fDateTime(event?.start as Date)}
          </Typography>
        </Box>

        <Box>
          <Typography variant='h6' sx={{ color: 'text.disabled' }}>
            End
          </Typography>
          <Typography variant='body2'>
            {fDateTime(event?.end as Date)}
          </Typography>
        </Box>
      </Stack>

      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant='outlined' color='inherit' onClick={onCancel}>
          Cancel
        </Button>

        <Button
          variant='contained'
          to={`${PATH_HOME.learning.root}/${event?.id}`}
          component={RouterLink}
          sx={{ ml: 1.5 }}
        >
          Join meeting
        </Button>
      </DialogActions>
    </>
  );
}
