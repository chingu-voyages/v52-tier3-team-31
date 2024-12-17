"use server";

import connectToDatabase from "@/app/lib/db";
import Request from "@/app/models/Request";
import dayjs from "dayjs";

await connectToDatabase();

// returns all booked time slots for the next 30 days
export async function getBookedTimeSlots() {
  let start = dayjs();
  let end = start.add(30, "day");

  let scheduledDates = await Request.find({
    scheduledDate: {
      $gte: start.toDate(),
      $lte: end.toDate(),
    },
  }).select("scheduledDate -_id");

  let timeSlots = {};
  for (let i = start; i < end; i = i.add(1, "day")) {
    let date = dayjs(i).format("MM/DD/YYYY");
    timeSlots[date] = [];
  }
  scheduledDates.forEach((item) => {
    let date = dayjs(item.scheduledDate).format("MM/DD/YYYY");
    let hour = dayjs(item.scheduledDate).hour();

    let slot = timeSlots[date];
    slot.push(hour);
    // sort the array of hours in ascending order
    slot.sort((a, b) => a - b);
  });

  return timeSlots;
}
