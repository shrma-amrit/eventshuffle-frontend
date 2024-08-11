import React from "react";
import { DateRow } from "../../components/DateRow";

interface SuitableDatesSectionProps {
  suitableDates: { date: string; people: string[] }[];
}

const SuitableDatesSection: React.FC<SuitableDatesSectionProps> = ({
  suitableDates,
}) => {
  return (
    <div className="space-y-4 mt-6">
      <h4 className="text-lg font-semibold mb-2">Suitable Dates</h4>
      {suitableDates.length ? (
        suitableDates.map((suitableDate) => (
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
    </div>
  );
};

export default SuitableDatesSection;
