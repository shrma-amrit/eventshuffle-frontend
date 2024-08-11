import React from "react";
import { DateRow } from "../../components/DateRow";

interface DateSectionProps {
  dates: string[];
  dateMap: Record<string, string[]>;
}

const DateSection: React.FC<DateSectionProps> = ({ dates, dateMap }) => {
  return (
    <div className="space-y-4 mt-6">
      <h4 className="text-lg font-semibold mb-2">Event Dates</h4>
      {dates.map((date) => (
        <DateRow key={date} date={date} people={dateMap[date]} />
      ))}
    </div>
  );
};

export default DateSection;
