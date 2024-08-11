import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useGetAllEventsQuery } from "../../features/manageEvents/manageEventsApi";
import {
  setErrorGetAllEvents,
  setEvents,
  setLoadingGetAllEvents,
} from "../../features/manageEvents/manageEventsSlice";
import { EventsList } from "../../components/EventsList";
import { EVENTS_CREATE_PATH } from "../../utils/constants";
import { Button } from "../../components/common/Button";
import { useNavigate } from "react-router-dom";

function EventListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetAllEventsQuery();

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoadingGetAllEvents());
    } else if (error) {
      dispatch(setErrorGetAllEvents(error));
    } else {
      dispatch(setEvents(data?.events ?? []));
    }
  }, [data, dispatch, error, isLoading]);

  return (
    <div className="m-8">
      <Button onClick={() => navigate(`/${EVENTS_CREATE_PATH}`)}>
        Create Event
      </Button>
      <EventsList />
    </div>
  );
}

export default EventListPage;
