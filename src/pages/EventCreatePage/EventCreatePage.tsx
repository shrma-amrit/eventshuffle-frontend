import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EVENTS_PATH } from "../../utils/constants";
import { useCreateEventMutation } from "../../features/manageEvents/manageEventsApi";
import { Input } from "../../components/common/InputFloatingLabel";
import { DateInputList } from "../../components/DateInputList";
import { Button } from "../../components/common/Button";
import { generateRandomId } from "../../utils/utils";

const EventCreatePage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [dates, setDates] = useState<{ id: string; value: string }[]>([
    { id: generateRandomId(), value: "" },
  ]);
  const navigate = useNavigate();

  const [createEvent, { isLoading, isSuccess }] = useCreateEventMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate(`/${EVENTS_PATH}`);
    }
  }, [isSuccess, navigate]);

  return (
    <div className="m-8 max-w-lg mx-auto">
      <h4 className="text-lg font-semibold mb-4">Create New Event</h4>
      <Input label="Event Name" value={name} onChange={setName} />
      <DateInputList dates={dates} setDates={setDates} />
      <div className="flex justify-end gap-4 mt-4">
        <Button variant="secondary" onClick={() => navigate(`/${EVENTS_PATH}`)}>
          Cancel
        </Button>
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
};

export default EventCreatePage;
