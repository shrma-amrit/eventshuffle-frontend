import { useNavigate, useParams } from "react-router-dom";
import {
  useCastVoteMutation,
  useLazyGetEventByIdQuery,
  useLazyGetEventResultQuery,
} from "../../features/manageEvents/manageEventsApi";
import { useEffect, useMemo, useState } from "react";
import { EVENTS_PATH } from "../../utils/constants";
import { Button } from "../../components/common/Button";

type VotesCount = Record<string, string[]>;

function EventViewPage() {
  let { id } = useParams();
  id = id ?? "";
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  const [getEventById, { data: eventById, isFetching: isFetchingEventById }] =
    useLazyGetEventByIdQuery();

  const [
    getEventResult,
    { data: eventResult, isFetching: isFetchingEventResult },
  ] = useLazyGetEventResultQuery();

  const [castVote, { isLoading, isSuccess }] = useCastVoteMutation();

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setSelectedValues([]);
      getEventById(id);
      getEventResult(id);
    }
  }, [getEventById, getEventResult, id, isSuccess]);

  useEffect(() => {
    getEventById(id);
    getEventResult(id);
  }, [getEventById, getEventResult, id]);

  const dateMap = useMemo(
    () =>
      eventById?.dates?.reduce<VotesCount>((acc, date) => {
        const voteData = eventById.votes.find((vote) => vote.date === date);
        acc[date] = voteData?.people ?? [];
        return acc;
      }, {}) ?? {},
    [eventById?.dates, eventById?.votes]
  );

  const handleCheckboxChange = (label: string) => {
    const newSelectedValues = selectedValues.includes(label)
      ? selectedValues.filter((value) => value !== label)
      : [...selectedValues, label];

    setSelectedValues(newSelectedValues);
  };

  return (
    <div>
      <Button onClick={() => navigate(`/${EVENTS_PATH}`)}>back to list</Button>
      {isFetchingEventById || isFetchingEventResult ? (
        <div>Loading</div>
      ) : (
        <div>
          <h3>{eventById?.name}</h3>
          <div>
            {eventById?.dates?.map((date) => {
              return (
                <div key={date}>
                  <div>{date}</div>
                  <div>{dateMap[date].length}</div>
                  <div>{dateMap[date].join(", ")}</div>
                  <div>-------------------------</div>
                </div>
              );
            })}
          </div>
          <h4>Suitable dates</h4>
          <div>
            {eventResult?.suitableDates?.map((suitableDate) => {
              return (
                <div key={suitableDate.date}>
                  <div>{suitableDate.date}</div>
                  <div>{suitableDate.people.length}</div>
                  <div>{suitableDate.people.join(", ")}</div>
                  <div>-------------------------</div>
                </div>
              );
            })}
          </div>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
            {eventById?.dates.map((label) => (
              <div className="checkbox" key={label}>
                <input
                  type="checkbox"
                  id={label}
                  checked={selectedValues.includes(label)}
                  onChange={() => handleCheckboxChange(label)}
                />
                <label htmlFor={label}>{label}</label>
              </div>
            ))}
            <Button
              onClick={() => castVote({ id, name, votes: selectedValues })}
              disabled={!name || !selectedValues.length || isLoading}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventViewPage;
