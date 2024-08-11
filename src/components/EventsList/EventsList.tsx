import React from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { EventListItem } from "../EventListItem";

const EventsList: React.FC = () => {
  const events = useAppSelector(
    (state: RootState) => state.manageEvents.events
  );

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      {events.map((event) => (
        <EventListItem event={event} key={event._id} />
      ))}
    </div>
  );
};

export default EventsList;
