import React from "react";

const DateView = ({dates, setSelectedDate}) => {
  return (
    <div className="sm:w-[20%] bg-slate-400">
      <h2 className="text-center">Dates</h2>
      <div className="flex flex-col">
        {dates.map((date) => {
          return <button onClick={()=> setSelectedDate(date)}>{date}</button>;
        })}
      </div>
    </div>
  );
};

export default DateView;
