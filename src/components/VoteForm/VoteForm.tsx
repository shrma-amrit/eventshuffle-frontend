import React, { useEffect, useState } from "react";
import { Button } from "../../components/common/Button";
import { useCastVoteMutation } from "../../features/manageEvents/manageEventsApi";

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

  const handleCheckboxChange = (label: string) => {
    const newSelectedValues = selectedValues.includes(label)
      ? selectedValues.filter((value) => value !== label)
      : [...selectedValues, label];

    setSelectedValues(newSelectedValues);
  };

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
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="p-2 border rounded-md w-full"
        />
        <div className="flex justify-center">
          <div className="space-y-2">
            {dates.map((label) => (
              <div className="flex items-center space-x-2" key={label}>
                <input
                  type="checkbox"
                  id={label}
                  checked={selectedValues.includes(label)}
                  onChange={() => handleCheckboxChange(label)}
                  className="form-checkbox"
                />
                <label htmlFor={label} className="ml-2 text-sm">
                  {label}
                </label>
              </div>
            ))}
          </div>
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
