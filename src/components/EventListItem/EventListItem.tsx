import { useNavigate } from "react-router-dom";
import { useLazyGetEventResultQuery } from "../../features/manageEvents/manageEventsApi";
import { EventListItemResp } from "../../features/manageEvents/types";
import { Accordion } from "../common/Accordion";
import { EVENTS_VIEW_PATH } from "../../utils/constants";
import { Button } from "../common/Button";
import { Loader } from "../common/Loader";
import { DateRow } from "../DateRow";

interface EventListItemProps {
  event: EventListItemResp;
}

const EventListItem: React.FC<EventListItemProps> = ({
  event,
}: EventListItemProps) => {
  const navigate = useNavigate();
  const [getEventResult, { data, isFetching }] = useLazyGetEventResultQuery();

  const handleOpen = () => {
    getEventResult(event._id);
  };

  const viewMoreClickHandler = () => {
    navigate(`/${EVENTS_VIEW_PATH.replace(":eventId", event._id)}`);
  };

  return (
    <Accordion title={event.name} onOpen={handleOpen} className="mt-4">
      <div className="flex justify-between items-center text-gray-700 font-semibold">
        Suitable Dates
        <Button size="small" onClick={viewMoreClickHandler} className="text-sm">
          Details
        </Button>
      </div>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          {data?.suitableDates.length ? (
            data.suitableDates.map((suitableDate) => (
              <DateRow
                key={suitableDate.date}
                date={suitableDate.date}
                people={suitableDate.people}
              />
            ))
          ) : (
            <div className="text-gray-500 mt-2">
              There are no votes on any date. Suitable dates will be shown after
              votes.
            </div>
          )}
        </>
      )}
    </Accordion>
  );
};

export default EventListItem;
