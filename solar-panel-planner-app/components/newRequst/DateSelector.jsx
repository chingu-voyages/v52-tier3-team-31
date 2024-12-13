"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getBookedTimeSlots } from "@/app/actions/planningActions";
import { timeSlots } from "@/utils/timesSlots";

const DateSelector = ({ onDateSlotConfirm, initialSelectedDate, initialSelectedSlot }) => {
  const [bookedSlots, setBookedSlots] = useState({});
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate || "");
  const [selectedSlot, setSelectedSlot] = useState(
    initialSelectedSlot
    ? timeSlots.find((slot) => slot.start === initialSelectedSlot)
    : null
  );

  useEffect(() => {
    let isMounted = true;

    const fetchBookedSlots = async () => {
      try {
        const slots = await getBookedTimeSlots();
        if (isMounted) {
          setBookedSlots(slots);
        }
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    };

    fetchBookedSlots();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedSlot(null);
  };
  console.log('selected date', selectedDate)

  const handleSelectedSlot = (slot) => {
    setSelectedSlot(slot);

    if (onDateSlotConfirm) {
      onDateSlotConfirm(selectedDate, slot);
    }
  };

  const todaysDate = dayjs().format("YYYY-MM-DD");

  const isSlotBooked = (date, start) => {
    const bookedHours = bookedSlots[dayjs(date).format("MM/DD/YYYY")] || [];
    const startHour = parseInt(start.split(":")[0], 10);
    return bookedHours.includes(startHour);
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        min={todaysDate}
        className="form-field"
      />

      {selectedDate && (
        <div>
          <h3 className="form-label">Select a prefrred time slot</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {timeSlots.map((slot, index) => (
              <div
                key={slot.start}
                onClick={() =>
                  !isSlotBooked(selectedDate, slot.start) &&
                  handleSelectedSlot(slot)
                }
                style={{
                  padding: "10px",
                  backgroundColor: isSlotBooked(selectedDate, slot.start)
                    ? "red"
                    : selectedSlot?.start === slot.start
                    ? "green"
                    : "gray",
                  color: "white",
                  cursor: isSlotBooked(selectedDate, slot.start)
                    ? "not-allowed"
                    : "pointer",
                }}
                className="text-center rounded-md w-full font-semibold"
              >
                {slot.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedSlot && (
        <div>
          <h4>
            Selected Slot: {""}
            {
              timeSlots.find((slot) => slot.start === selectedSlot.start)?.label
            }{" "}
            on {dayjs(selectedDate).format("MM/DD/YYYY")}
          </h4>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
