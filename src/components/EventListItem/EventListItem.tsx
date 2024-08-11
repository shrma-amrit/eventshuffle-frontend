import { useNavigate } from "react-router-dom";
import { useLazyGetEventResultQuery } from "../../features/manageEvents/manageEventsApi";
import { EventListItemResp } from "../../features/manageEvents/types";
import { Accordion } from "../common/Accordion";
import { EVENTS_VIEW_PATH } from "../../utils/constants";
import { Button } from "../common/Button";
import { Loader } from "../common/Loader";
import { Avatar } from "../common/Avatar";

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
              <div
                key={suitableDate.date}
                className="flex items-center mt-2 p-2 border rounded-lg bg-gray-50"
              >
                <div className="font-medium text-blue-600 flex-shrink-0">
                  {suitableDate.date}
                </div>
                <div className="flex items-center ml-4 space-x-2 text-gray-500">
                  {suitableDate.people.map((person) => (
                    <Avatar name={person} key={person} />
                  ))}
                </div>
              </div>
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
