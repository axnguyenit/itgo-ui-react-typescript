import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import cartReducer from './slices/cart';
import calendarReducer from './slices/calendar';

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
  cart: cartReducer,
  calendar: calendarReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const { dispatch } = store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
