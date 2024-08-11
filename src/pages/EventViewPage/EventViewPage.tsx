import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useLazyGetEventByIdQuery,
  useLazyGetEventResultQuery,
} from "../../features/manageEvents/manageEventsApi";
import { EVENTS_PATH } from "../../utils/constants";
import { VoteForm } from "../../components/VoteForm";
import { Button } from "../../components/common/Button";
import { Loader } from "../../components/common/Loader";
import { SuitableDatesSection } from "../../components/SuitableDatesSection";
import { DateSection } from "../../components/DateSection";

type VotesCount = Record<string, string[]>;

const EventViewPage: React.FC = () => {
  const { eventId = "" } = useParams();
  const [triggerGetEvent, setTriggerGetEvent] = useState<boolean>(true);
  const navigate = useNavigate();

  const [getEventById, { data: eventById, isFetching: isFetchingEventById }] =
    useLazyGetEventByIdQuery();

  const [
    getEventResult,
    { data: eventResult, isFetching: isFetchingEventResult },
  ] = useLazyGetEventResultQuery();

  useEffect(() => {
    if (triggerGetEvent) {
      getEventById(eventId);
      getEventResult(eventId);
      setTriggerGetEvent(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerGetEvent]);

  const dateMap = useMemo(
    () =>
      eventById?.dates?.reduce<VotesCount>((acc, date) => {
        const voteData = eventById.votes.find((vote) => vote.date === date);
        acc[date] = voteData?.people ?? [];
        return acc;
      }, {}) ?? {},
    [eventById?.dates, eventById?.votes]
  );

  return (
    <div className="m-8">
      {isFetchingEventById || isFetchingEventResult ? (
        <Loader />
      ) : (
        <div>
          <Button onClick={() => navigate(`/${EVENTS_PATH}`)}>
            Back to list
          </Button>
          <DateSection dateMap={dateMap} dates={eventById?.dates ?? []} />
          <SuitableDatesSection
            suitableDates={eventResult?.suitableDates ?? []}
          />
          <VoteForm
            eventId={eventId}
            dates={eventById?.dates ?? []}
            setTriggerGetEvent={setTriggerGetEvent}
          />
        </div>
      )}
    </div>
  );
};

export default EventViewPage;
