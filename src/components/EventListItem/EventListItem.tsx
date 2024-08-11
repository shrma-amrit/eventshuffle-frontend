import { useNavigate } from "react-router-dom";
import { useLazyGetEventResultQuery } from "../../features/manageEvents/manageEventsApi";
import { EventListItemResp } from "../../features/manageEvents/types";
import { Accordion } from "../common/Accordion";
import { EVENTS_VIEW_PATH } from "../../utils/constants";
import { Button } from "../common/Button";
import { Loader } from "../common/Loader";

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
    navigate(`/${EVENTS_VIEW_PATH.replace(":id", event._id)}`);
  };

  return (
    <Accordion title={event.name} onOpen={handleOpen} className="mt-4">
      <div className="text-gray-700 font-semibold">Suitable Dates</div>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          {data?.suitableDates.map((suitableDate) => {
            return (
              <div
                key={suitableDate.date}
                className="mt-2 p-2 border rounded-lg bg-gray-50"
              >
                <div className="font-medium text-blue-600">
                  {suitableDate.date}
                </div>
                <div className="text-gray-500">
                  {suitableDate.people.join(", ")}
                </div>
              </div>
            );
          })}
          <Button
            size="small"
            onClick={viewMoreClickHandler}
            className="mt-4 text-sm"
          >
            View More
          </Button>
        </>
      )}
    </Accordion>
  );
};

export default EventListItem;
