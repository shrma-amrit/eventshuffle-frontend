import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EVENTS_PATH } from "../../utils/constants";
import { useCreateEventMutation } from "../../features/manageEvents/manageEventsApi";
import { generateRandomId } from "../../utils/utils";
import { Button } from "../../components/common/Button";

function EventCreatePage() {
  const [name, setName] = useState<string>("");
  const [dates, setDates] = useState<{ id: string; value: string }[]>([]);
  const navigate = useNavigate();

  const [createEvent, { isLoading, isSuccess }] = useCreateEventMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate(`/${EVENTS_PATH}`);
    }
  }, [isSuccess, navigate]);

  return (
    <div>
      <input
        name="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <div>Dates</div>
      {dates.map((date, index) => {
        return (
          <div key={date.id}>
            <input
              type="text"
              value={date.value}
              onChange={(e) =>
                setDates((prev) => {
                  const dates = [...prev];
                  dates[index].value = e.target.value;
                  return dates;
                })
              }
              placeholder="Enter date"
            />
          </div>
        );
      })}
      <Button
        onClick={() =>
          setDates((prev) => [...prev, { id: generateRandomId(), value: "" }])
        }
      >
        Add new date
      </Button>
      <div>
        <Button onClick={() => navigate(`/${EVENTS_PATH}`)}>Cancel</Button>
        <Button
          onClick={() =>
            createEvent({
              name,
              dates: Array.from(
                new Set(dates.flatMap((date) => date.value))
              ).filter((date) => !!date.trim()),
            })
          }
          disabled={
            name.trim() === "" ||
            dates.length <= 0 ||
            !dates.some((date) => date.value.trim() !== "") ||
            isLoading
          }
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default EventCreatePage;
