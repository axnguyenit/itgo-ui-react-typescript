// @mui
import {
  Button,
  IconButton,
  Stack,
  ToggleButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Iconify from '~/components/Iconify';
// hooks
import { useResponsive } from '~/hooks';
//
import { CalendarView } from '~/models';
import { fDate } from '~/utils';

// ----------------------------------------------------------------------

interface ViewOptions {
  value: CalendarView;
  label: string;
  icon: string;
}

const VIEW_OPTIONS: ViewOptions[] = [
  { value: 'dayGridMonth', label: 'Month', icon: 'ic:round-view-module' },
  { value: 'timeGridWeek', label: 'Week', icon: 'ic:round-view-week' },
  { value: 'timeGridDay', label: 'Day', icon: 'ic:round-view-day' },
  // { value: 'listWeek', label: 'Agenda', icon: 'ic:round-view-agenda' },
];

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(2.5),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

// ----------------------------------------------------------------------

interface CalendarToolbarProps {
  date: Date;
  onToday: () => void;
  onNextDate: () => void;
  onPrevDate: () => void;
  onChangeView: (value: CalendarView) => void;
  view: CalendarView;
}

export default function CalendarToolbar({
  date,
  view,
  onToday,
  onNextDate,
  onPrevDate,
  onChangeView,
}: CalendarToolbarProps) {
  const isDesktop = useResponsive('up', 'sm');

  return (
    <RootStyle>
      {isDesktop && (
        <Stack direction='row' spacing={0.5}>
          {VIEW_OPTIONS.map((viewOption) => (
            <Tooltip key={viewOption.value} title={viewOption.label}>
              <ToggleButton
                value={view}
                selected={viewOption.value === view}
                onChange={() => onChangeView(viewOption.value)}
                sx={{ width: 32, height: 32, padding: 0, border: 0 }}
              >
                <Iconify icon={viewOption.icon} width={20} height={20} />
              </ToggleButton>
            </Tooltip>
          ))}
        </Stack>
      )}

      <Stack direction='row' alignItems='center' spacing={2}>
        <IconButton onClick={onPrevDate}>
          <Iconify icon='eva:arrow-ios-back-fill' width={20} height={20} />
        </IconButton>

        <Typography variant='h5'>{fDate(date)}</Typography>

        <IconButton onClick={onNextDate}>
          <Iconify icon='eva:arrow-ios-forward-fill' width={20} height={20} />
        </IconButton>
      </Stack>

      {isDesktop && (
        <Button
          size='small'
          color='error'
          variant='contained'
          onClick={onToday}
        >
          Today
        </Button>
      )}
    </RootStyle>
  );
}
