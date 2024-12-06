const DateView = ({ selectedDate, setSelectedDate, dates }) => {
  return (
    <div className="rounded-lg overflow-auto border">
      <h3 className="p-4 text-center font-semibold border-b-2">Select Date</h3>
      <div className="flex flex-col">
        {dates.map((date, idx) => {
          const isSelected = selectedDate === date.format("MM/DD/YYYY");
          return (
            <button
              key={idx}
              onClick={() => setSelectedDate(date.format("MM/DD/YYYY"))}
              className={`p-3  ${
                isSelected
                  ? "bg-primary-dark text-white hover:bg-primary-dark"
                  : "text-primary-dark"
              }  hover:bg-gray-100`}
            >
              {date.format("D MMMM")}{" "}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DateView;
