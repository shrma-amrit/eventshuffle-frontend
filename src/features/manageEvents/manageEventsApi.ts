import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CastVoteApiReqBody,
  CreateEventApiReqBody,
  Event,
  GetAllEventsApiResp,
  GetEventResultApiResp,
} from "./types";

export const manageEventsApi = createApi({
  reducerPath: "manageEventsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:3000/api/v1/event",
  }),
  endpoints: (builder) => ({
    getAllEvents: builder.query<GetAllEventsApiResp, void>({
      query: () => "/list",
    }),
    getEventById: builder.query<Event, string>({
      query: (id) => `/${id}`,
    }),
    getEventResult: builder.query<GetEventResultApiResp, string>({
      query: (id) => `/${id}/results`,
    }),
    castVote: builder.mutation<Event, CastVoteApiReqBody>({
      query: ({ id, ...body }) => ({
        url: `/${id}/vote`,
        method: "POST",
        body,
      }),
    }),
    createEvent: builder.mutation<Event, CreateEventApiReqBody>({
      query: (body) => ({ url: "", method: "POST", body }),
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useLazyGetEventResultQuery,
  useLazyGetEventByIdQuery,
  useCastVoteMutation,
  useCreateEventMutation,
} = manageEventsApi;
