import React, { useState } from "react";

const DateView = ({ setSelectedDate, dates}) => {

  return (
    <div className="bg-slate-400">
      <h2 className="text-center">Dates</h2>
      <div className="flex flex-col">
        {dates.map((date, idx) => {
          return <button key={idx} onClick={()=> setSelectedDate(date.format("MM/DD/YYYY"))}>{date.format("MM/DD/YYYY")} </button>;
        })}
      </div>
    </div>
  );
};

export default DateView;
