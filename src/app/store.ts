import { configureStore } from "@reduxjs/toolkit";
import manageEventsReducer from "../features/manageEvents/manageEventsSlice";
import { manageEventsApi } from "../features/manageEvents/manageEventsApi";

export const store = configureStore({
  reducer: {
    manageEvents: manageEventsReducer,
    [manageEventsApi.reducerPath]: manageEventsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(manageEventsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
