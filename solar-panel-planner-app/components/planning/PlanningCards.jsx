import React, { useState } from "react";
import RequestCard from "../request/RequestCard";
import dayjs from "dayjs";
import { timeSlots } from "@/utils/timesSlots";
import Dropdown from "./Dropdown";

const PlanningCards = ({ allPlannedRequests, rescheduleSelectedTimeSlot }) => {
  const [isHovered, setIsHovered] = useState(null);

  const requestedTimeSlots = allPlannedRequests.map((request) => {
    return dayjs(request.requestedDate).format("HH:mm");
  });
  const availableTimeSlots = timeSlots
    .filter((slot) => !requestedTimeSlots.includes(slot.start))
    .map((slot) => slot.start);

  return (
    <div className="flex flex-col gap-5">
      {allPlannedRequests.length === 0 && <h1>No Request!</h1>}
      {allPlannedRequests.map((request, idx) => {
        return (
          <div key={idx} className="flex items-center gap-10">
            <div
              onMouseEnter={() => setIsHovered(idx)}
              onMouseLeave={() => setIsHovered(null)}
            >
              {isHovered === idx && request.status !== "scheduled" ? (
                <Dropdown
                  values={availableTimeSlots}
                  setSelectedValue={(time)=> rescheduleSelectedTimeSlot(time, request._id)}
                />
              ) : (
                <p className="whitespace-nowrap">
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
