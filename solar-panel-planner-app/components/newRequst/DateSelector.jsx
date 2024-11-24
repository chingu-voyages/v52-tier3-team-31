import React, { useState } from "react";
import dayjs from "dayjs";

const DateSelector = ({handleSlotSelect}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const timeSlots = [
    { label: "8:00 AM - 10:00 AM", start: "08:00", end: "10:00" },
    { label: "10:00 AM - 12:00 PM", start: "10:00", end: "12:00" },
    { label: "12:00 PM - 2:00 PM", start: "12:00", end: "14:00" },
    { label: "2:00 PM - 4:00 PM", start: "14:00", end: "16:00" },
    { label: "4:00 PM - 6:00 PM", start: "16:00", end: "18:00" },
  ];

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSelectedSlot = (slot) =>{
    setSelectedSlot(slot);
  
    const formattedDateTime = `${selectedDate} ${slot.start}`;
    const seletedTime = dayjs(formattedDateTime).format(
        "MM/DD/YYYY h:mm A"
      );
      handleSlotSelect(seletedTime)
  }

  const todaysDate = dayjs().format("YYYY-MM-DD");

  return (
    <div>
      <input type="date" value={selectedDate} onChange={handleDateChange} min={todaysDate} />

      {selectedDate && (
        <div>
          <h3>Available Time Slots:</h3>
          <div>
            {timeSlots.map((slot) => (
              <button
                key={slot.start}
                onClick={() => handleSelectedSlot(slot)}
                style={{
                  margin: "5px",
                  padding: "10px",
                  backgroundColor: selectedSlot?.start === slot.start ? "green" : "gray",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Confirm Selection */}
      {selectedSlot && (
        <div>
          <h4>
            Selected Slot: {""}
            {
              timeSlots.find((slot) => slot.start === selectedSlot.start)?.label
            } on {dayjs(selectedDate.start).format("MM/DD/YYYY")}
          </h4>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
