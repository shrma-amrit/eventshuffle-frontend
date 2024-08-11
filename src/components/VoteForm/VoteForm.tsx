import React, { useEffect, useState } from "react";
import { Button } from "../../components/common/Button";
import { useCastVoteMutation } from "../../features/manageEvents/manageEventsApi";
import { MultiselectCheckbox } from "../common/MultiselectCheckbox";
import { Input } from "../common/InputFloatingLabel";

interface VoteFormProps {
  eventId: string;
  dates: string[];
  setTriggerGetEvent: React.Dispatch<React.SetStateAction<boolean>>;
}

const VoteForm: React.FC<VoteFormProps> = ({
  eventId,
  dates,
  setTriggerGetEvent,
}) => {
  const [name, setName] = useState<string>("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const [castVote, { isLoading, isSuccess }] = useCastVoteMutation();

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setSelectedValues([]);
      setTriggerGetEvent(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className="flex justify-center">
      <div className="mt-6 space-y-4 w-64 border rounded-sm p-2 shadow-md">
        <h4 className="text-lg font-semibold">Cast Your Vote</h4>
        <Input label="Name" value={name} onChange={setName} />
        <div className="flex justify-center">
          <MultiselectCheckbox
            labels={dates}
            selectedValues={selectedValues}
            onSelectedValuesChange={setSelectedValues}
          />
        </div>
        <Button
          onClick={() => castVote({ id: eventId, name, votes: selectedValues })}
          disabled={!name || !selectedValues.length || isLoading}
          fullWidth
        >
          Vote
        </Button>
      </div>
    </div>
  );
};

export default VoteForm;
