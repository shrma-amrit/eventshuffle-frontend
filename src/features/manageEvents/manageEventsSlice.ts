import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorType, EventListItemResp, EventsState } from "./types";

const initialState: EventsState = {
  loadingGetAllEvents: false,
  events: [],
  errorGetAllEvents: undefined,
};

export const manageEventsSlice = createSlice({
  name: "manageEventsSlice",
  initialState,
  reducers: {
    setLoadingGetAllEvents: (state) => {
      state.loadingGetAllEvents = true;
      state.events = [];
      state.errorGetAllEvents = undefined;
    },
    setEvents: (state, action: PayloadAction<EventListItemResp[]>) => {
      state.loadingGetAllEvents = false;
      state.events = action?.payload;
      state.errorGetAllEvents = undefined;
    },
    setErrorGetAllEvents: (state, action: PayloadAction<ErrorType>) => {
      state.loadingGetAllEvents = false;
      state.events = [];
      state.errorGetAllEvents = action?.payload;
    },
  },
});

export const { setLoadingGetAllEvents, setEvents, setErrorGetAllEvents } =
  manageEventsSlice.actions;

export default manageEventsSlice.reducer;
