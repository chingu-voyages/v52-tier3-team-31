const DateView = ({selectedDate, setSelectedDate, dates }) => {
  return (
    <div className="">
      <h2 className="text-center text-xl font-bold mb-3">Dates</h2>
      <div className="flex flex-col">
        {dates.map((date, idx) => {
          const isSelected = selectedDate === date.format("MM/DD/YYYY");
          return (
            <button
              key={idx}
              onClick={() => setSelectedDate(date.format("MM/DD/YYYY"))}
              className={`p-3 ${isSelected ? 'bg-slate-500' : 'text-blue-600'}`}
            >
              {date.format("MM/DD/YYYY")}{" "}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DateView;
