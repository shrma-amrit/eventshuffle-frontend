import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type ErrorType = FetchBaseQueryError | SerializedError | undefined;

interface Vote {
  _id: string;
  date: string;
  people: string[];
}

interface Event {
  _id: string;
  name: string;
  dates: string[];
  votes: Vote[];
}

type EventListItemResp = Pick<Event, "_id" | "name">;

interface EventsState {
  loadingGetAllEvents: boolean;
  events: EventListItemResp[];
  errorGetAllEvents: ErrorType;
}

interface GetAllEventsApiResp {
  events: EventListItemResp[];
}

type GetEventResultApiResp = EventListItemResp & {
  suitableDates: Pick<Vote, "date" | "people">[];
};

interface CastVoteApiReqBody {
  id: string;
  name: string;
  votes: string[];
}

type CreateEventApiReqBody = Pick<Event, "name" | "dates">;

export type {
  Event,
  EventsState,
  ErrorType,
  EventListItemResp,
  GetAllEventsApiResp,
  GetEventResultApiResp,
  CastVoteApiReqBody,
  CreateEventApiReqBody,
};
