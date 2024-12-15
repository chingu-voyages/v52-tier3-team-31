import React, { useState } from "react";
import RequestCard from "../request/RequestCard";
import dayjs from "dayjs";
import { timeSlots } from "@/utils/timesSlots";
import Dropdown from "./Dropdown";
import { FaCalendarXmark } from "react-icons/fa6";

const PlanningCards = ({ allPlannedRequests, rescheduleSelectedTimeSlot }) => {
  const [isHovered, setIsHovered] = useState(null);

  const requestedTimeSlots = allPlannedRequests.map((request) => {
    return dayjs(request.requestedDate).format("HH:mm");
  });
  const availableTimeSlots = timeSlots
    .filter((slot) => !requestedTimeSlots.includes(slot.start))
    .map((slot) => slot.start);

  return (
    <div className="flex flex-col gap-2">
      {allPlannedRequests.length === 0 && (
        <div className="flex flex-col gap-10 mx-auto items-center mt-20 ">
          <FaCalendarXmark size={70} />
          <h1 className="text-2xl">
            No inspection requests found for this date.
          </h1>
        </div>
      )}
      {allPlannedRequests.map((request, idx) => {
        return (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-start gap-4 bg-gray-50 p-4"
          >
            <div
              className="w-24 "
              onMouseEnter={() => setIsHovered(idx)}
              onMouseLeave={() => setIsHovered(null)}
            >
              {isHovered === idx && request.status !== "scheduled" ? (
                <Dropdown
                  values={availableTimeSlots}
                  setSelectedValue={(time) =>
                    rescheduleSelectedTimeSlot(time, request._id)
                  }
                />
              ) : (
                <p className="whitespace-nowrap  text-xl font-semibold">
                  {dayjs(request.scheduledDate).format("h.mm A")}
                </p>
              )}
            </div>
            <RequestCard request={request} />
          </div>
        );
      })}
    </div>
  );
};

export default PlanningCards;
