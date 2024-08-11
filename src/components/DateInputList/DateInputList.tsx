import React from "react";
import { Input } from "../common/InputFloatingLabel";
import { Button } from "../common/Button";
import { generateRandomId } from "../../utils/utils";

interface DateInputListProps {
  dates: { id: string; value: string }[];
  setDates: React.Dispatch<
    React.SetStateAction<{ id: string; value: string }[]>
  >;
}

const DateInputList: React.FC<DateInputListProps> = ({ dates, setDates }) => {
  const areAllDatesValid = dates.every((date) => date.value.trim() !== "");

  return (
    <div className="space-y-4 mt-6">
      <div className="text-lg font-semibold">Dates</div>
      {dates.map((date, index) => (
        <Input
          type="date"
          key={date.id}
          label={`Date ${index + 1}`}
          value={date.value}
          onChange={(value) =>
            setDates((prev) => {
              const newDates = [...prev];
              newDates[index].value = value;
              return newDates;
            })
          }
        />
      ))}
      <Button
        onClick={() =>
          setDates((prev) => [...prev, { id: generateRandomId(), value: "" }])
        }
        className="w-full mt-2"
        disabled={!areAllDatesValid}
      >
        Add New Date
      </Button>
    </div>
  );
};

export default DateInputList;
