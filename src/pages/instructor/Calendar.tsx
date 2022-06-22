import { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// calendar
import FullCalendar, {
  DateSelectArg,
  EventClickArg,
} from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
// @mui
import {
  Button,
  Card,
  Container,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
// components
import Page from '~/components/Page';
import { DialogAnimate } from '~/components/animate';
import HeaderBreadcrumbs from '~/components/HeaderBreadcrumbs';
import { CalendarStyle, CalendarToolbar } from '~/components/calendar';
// redux
import { selectRange } from '~/redux/slices/calendar';
// paths
import { PATH_HOME, PATH_INSTRUCTOR } from '~/routes/paths';
// sections
import { CalendarForm } from '~/sections/instructor/calendar';
// hooks
import { useAppDispatch, useAppSelector, useResponsive } from '~/hooks';
// api
import eventApi from '~/api/eventApi';
import { CalendarView, Event, CalendarArg } from '~/models';

// ----------------------------------------------------------------------

export default function Calendar() {
  const dispatch = useAppDispatch();
  const isDesktop = useResponsive('up', 'sm');
  const calendarRef = useRef<FullCalendar>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>(
    isDesktop ? 'dayGridMonth' : 'listWeek'
  );
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { selectedRange } = useAppSelector((state) => state.calendar);

  const getEvents = async () => {
    try {
      const response = await eventApi.getByInstructor();
      setEvents(response.events);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isDesktop ? 'dayGridMonth' : 'listWeek';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [isDesktop]);

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleChangeView = (newView: CalendarView) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  // user not need
  const handleSelectRange = (arg: DateSelectArg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    // dispatch(selectRange(arg.start, arg.end));
    setIsOpenModal(true);
  };

  const handleSelectEvent = (arg: EventClickArg) => {
    const selectedEvent = events.find((event) => event.id === arg.event.id);
    setSelectedEvent(selectedEvent);
    setIsOpenModal(true);
  };

  const handleResizeEvent = async (event: any) => {
    try {
      // dispatch(
      //   updateEvent(event.id, {
      //     allDay: event.allDay,
      //     start: event.start,
      //     end: event.end,
      //   })
      // );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropEvent = async (event: any) => {
    try {
      // dispatch(
      //   updateEvent(event.id, {
      //     allDay: event.allDay,
      //     start: event.start,
      //     end: event.end,
      //   })
      // );
      setIsOpenModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSelectedEvent(undefined);
  };

  return (
    <Page title='Calendar'>
      <Container maxWidth='xl'>
        <HeaderBreadcrumbs
          heading='Calendar'
          links={[
            { name: 'Instructor', href: PATH_INSTRUCTOR.root },
            { name: 'Calendar' },
          ]}
        />

        <Card>
          <CalendarStyle>
            <CalendarToolbar
              date={date}
              view={view}
              onNextDate={handleClickDateNext}
              onPrevDate={handleClickDatePrev}
              onToday={handleClickToday}
              onChangeView={handleChangeView}
            />
            <FullCalendar
              weekends
              droppable
              selectable //user not need
              events={events}
              ref={calendarRef}
              rerenderDelay={10}
              initialDate={date}
              initialView={view}
              dayMaxEventRows={3}
              eventDisplay='block'
              headerToolbar={false}
              allDayMaintainDuration
              eventResizableFromStart
              select={handleSelectRange}
              eventDrop={handleDropEvent}
              eventClick={handleSelectEvent}
              eventResize={handleResizeEvent}
              height={isDesktop ? 720 : 'auto'}
              plugins={[
                listPlugin,
                dayGridPlugin,
                timelinePlugin,
                timeGridPlugin,
                interactionPlugin,
              ]}
            />
          </CalendarStyle>
        </Card>

        <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
          <DialogTitle>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='subtitle1'>
                {selectedEvent ? 'Edit Event' : 'Add Event'}
              </Typography>
              {selectedEvent && (
                <Button
                  variant='contained'
                  to={`${PATH_HOME.learning.root}/${selectedEvent?.id}`}
                  component={RouterLink}
                  sx={{ ml: 1.5 }}
                >
                  Join meeting
                </Button>
              )}
            </Stack>
          </DialogTitle>
          <CalendarForm
            event={selectedEvent}
            range={selectedRange}
            onCancel={handleCloseModal}
            onGetEvents={getEvents}
          />
        </DialogAnimate>
      </Container>
    </Page>
  );
}
