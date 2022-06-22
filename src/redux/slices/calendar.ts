import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { eventApi } from '~/api';
import { CalendarArg, Event } from '~/models';

// ----------------------------------------------------------------------

interface Calendar {
  date: Date;
  isLoading: boolean;
  events: Event[];
  isOpenModal: boolean;
  selectedEvent: Event | null;
  selectedRange: CalendarArg;
}

const initialState: Calendar = {
  date: new Date(),
  isLoading: false,
  events: [],
  isOpenModal: false,
  selectedEvent: null,
  selectedRange: {
    start: new Date(),
    end: new Date(),
  },
};

export const getEvents = createAsyncThunk<Event[], string>(
  'calendar/getEvents',
  async (id) => {
    const { events } = await eventApi.getByStudent(id);
    return events;
  }
);

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setDate(state: Calendar, action: PayloadAction<Date>) {
      state.date = action.payload;
    },
    selectRange(state: Calendar, action: PayloadAction<CalendarArg>) {
      state.selectedRange = action.payload;
      state.isOpenModal = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEvents.fulfilled, (state, { payload }) => {
      state.events = payload;
    });
  },
});

export const { setDate, selectRange } = calendarSlice.actions;
export default calendarSlice.reducer;
