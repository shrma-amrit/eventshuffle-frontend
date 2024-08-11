import React from "react";
import { Avatar } from "../common/Avatar";

interface DateRowProps {
  date: string;
  people: string[];
}

const DateRow: React.FC<DateRowProps> = ({ date, people }) => {
  return (
    <div className="flex items-center mt-2 p-2 border rounded-lg bg-gray-50 h-[58px]">
      <div className="font-medium text-blue-600 flex-shrink-0">{date}</div>
      <div className="w-px h-6 bg-gray-300 mx-4"></div>
      <div className="text-gray-700 flex-shrink-0">{people.length}</div>
      <div className="w-px h-6 bg-gray-300 mx-4"></div>
      <div className="flex items-center space-x-2 text-gray-500">
        {people.map((person) => (
          <Avatar name={person} key={person} />
        ))}
      </div>
    </div>
  );
};

export default DateRow;
