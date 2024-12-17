import React from "react";

const Dropdown = ({ values, setSelectedValue }) => {
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  return (
    <div className=" max-w-lg inline-flex gap-2 p-4 mx-auto ">
      <h2>Select date : </h2>
      <select
        className="w-full p-2 border border-gray-300 rounded-md min-w-[80px]"
        onChange={handleChange}
        defaultValue={values[0] || ""}
      >
        {values.map((date, idx) => (
          <option key={idx} value={date}>
            {date}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
