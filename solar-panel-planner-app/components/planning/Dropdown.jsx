import React from "react";

const Dropdown = ({dates, selectedDate, setSelectedDate }) => {
  return (
    <select
      className="w-full p-2 border border-gray-300 rounded-md"
      onChange={(e) => setSelectedDate(e.target.value)}
      value={selectedDate}
    >
      {dates.map((date, idx) => (
        <option key={idx} value={date.format("MM/DD/YYYY")}>
          {date.format("MM/DD/YYYY")}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
