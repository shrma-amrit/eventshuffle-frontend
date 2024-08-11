import React from "react";

interface MultiselectCheckboxProps {
  labels: string[];
  selectedValues: string[];
  onSelectedValuesChange: (values: string[]) => void;
}

const MultiselectCheckbox: React.FC<MultiselectCheckboxProps> = ({
  labels,
  selectedValues,
  onSelectedValuesChange,
}) => {
  const handleCheckboxChange = (label: string) => {
    const newSelectedValues = selectedValues.includes(label)
      ? selectedValues.filter((value) => value !== label)
      : [...selectedValues, label];

    onSelectedValuesChange(newSelectedValues);
  };

  return (
    <div className="space-y-2">
      {labels.map((label) => (
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
  );
};

export default MultiselectCheckbox;
