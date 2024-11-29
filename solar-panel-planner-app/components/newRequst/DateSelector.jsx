"use client"
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getBookedTimeSlots } from "@/app/actions/planningActions";

const DateSelector = ({ onDateSlotConfirm }) => {
  const [bookedSlots, setBookedSlots] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const timeSlots = [
    { label: "8:00 AM - 9:00 AM", start: "08:00", end: "09:00" },
    { label: "9:00 AM - 10:00 AM", start: "09:00", end: "10:00" },
    { label: "10:00 AM - 11:00 AM", start: "10:00", end: "11:00" },
    { label: "11:00 AM - 12:00 PM", start: "11:00", end: "12:00" },
    { label: "12:00 PM - 1:00 PM", start: "12:00", end: "13:00" },
    { label: "1:00 PM - 2:00 PM", start: "13:00", end: "14:00" },
    { label: "2:00 PM - 3:00 PM", start: "14:00", end: "15:00" },
    { label: "3:00 PM - 4:00 PM", start: "15:00", end: "16:00" },
    { label: "4:00 PM - 5:00 PM", start: "16:00", end: "17:00" },
  ];

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
    <div>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        min={todaysDate}
      />

      {selectedDate && (
        <div>
          <h3>Available Time Slots:</h3>
          <div className="flex flex-wrap">
            {timeSlots.map((slot, index) => (
              <div
                key={slot.start}
                onClick={() => !isSlotBooked(selectedDate, slot.start) && handleSelectedSlot(slot)}
                style={{
                  margin: "5px",
                  padding: "10px",
                  backgroundColor: isSlotBooked(selectedDate, slot.start)
                  ? "red"
                  : selectedSlot?.start === slot.start
                  ? "green"
                  : "gray",
                  color: "white",
                  border: "none",
                  cursor: isSlotBooked(selectedDate, slot.start)
                    ? "not-allowed"
                    : "pointer",
                  width: "170px",
                }}
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
            on {dayjs(selectedDate.start).format("MM/DD/YYYY")}
          </h4>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
