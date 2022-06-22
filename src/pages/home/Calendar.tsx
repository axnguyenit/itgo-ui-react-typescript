import { useState, useRef, useEffect } from 'react';
// calendar
import FullCalendar, { EventClickArg } from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
// router
import { useParams, useNavigate } from 'react-router-dom';
import { PATH_PAGE } from '~/routes/paths';
// @mui
import { Card, Container } from '@mui/material';
// components
import Page from '~/components/Page';
import { DialogAnimate } from '~/components/animate';
import { CalendarStyle, CalendarToolbar } from '~/components/calendar';
// sections
import { CalendarEvent } from '~/sections/event';
// hooks
import { useResponsive } from '~/hooks';
// api
import eventApi from '~/api/eventApi';
import { CalendarView, Event } from '~/models';

// ----------------------------------------------------------------------

export default function Calendar() {
  const isDesktop = useResponsive('up', 'sm');
  const calendarRef = useRef<FullCalendar>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>(
    isDesktop ? 'dayGridMonth' : 'listWeek'
  );
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        const { events } = await eventApi.getByStudent(id);
        setEvents(events);
      } catch (error) {
        console.error(error);
        navigate(PATH_PAGE.page500);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (!calendarEl) return;
    const calendarApi = calendarEl.getApi();
    const newView = isDesktop ? 'dayGridMonth' : 'listWeek';
    calendarApi.changeView(newView);
    setView(newView);
  }, [isDesktop]);

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (!calendarEl) return;
    const calendarApi = calendarEl.getApi();
    calendarApi.today();
    // setDate(calendarApi.getDate());
    console.log(calendarApi.getDate());
  };

  const handleChangeView = (newView: CalendarView) => {
    const calendarEl = calendarRef.current;
    if (!calendarEl) return;
    const calendarApi = calendarEl.getApi();
    calendarApi.changeView(newView);
    setView(newView);
  };

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (!calendarEl) return;
    const calendarApi = calendarEl.getApi();
    calendarApi.prev();
    // setDate(calendarApi.getDate());
    console.log(calendarApi.getDate());
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (!calendarEl) return;
    const calendarApi = calendarEl.getApi();
    calendarApi.next();
    // setDate(calendarApi.getDate());
    console.log(calendarApi.getDate());
  };

  const handleSelectEvent = (arg: EventClickArg) => {
    const selectedEvent = events.find((event) => event.id === arg.event.id);

    setSelectedEvent(selectedEvent as Event);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSelectedEvent(undefined);
  };

  return (
    <Page title='Calendar'>
      <Container maxWidth='lg' sx={{ mt: 15, mb: 10 }}>
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
              eventClick={handleSelectEvent}
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
          <CalendarEvent event={selectedEvent} onCancel={handleCloseModal} />
        </DialogAnimate>
      </Container>
    </Page>
  );
}
