"use client";
import DateView from "@/components/planning/DateView";
import dayjs from "dayjs";
import PlanningCards from "@/components/planning/PlanningCards";
import React, { useEffect, useState } from "react";
import PlanningHeader from "@/components/planning/PlanningHeader";
import Dropdown from "@/components/planning/Dropdown";
import { getAllPlanVisitRequests, updateRequestStatus, updateRequestTimeSlot } from "@/app/actions/requestActions";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";

const Planning = () => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("MM/DD/YYYY")
  );
  const [allPlannedRequests, setAllPlannedRequest] = useState([]);

  useEffect(() => {
    const getAllRequestsData = async () => {
      const allRequest = await getAllPlanVisitRequests();
      const filtered = allRequest.data.filter((request) => {
        const requestedDate = dayjs(request.requestedDate).format("MM/DD/YYYY");
        return requestedDate === selectedDate;
      });
      setAllPlannedRequest(filtered);
    };
    getAllRequestsData();
  }, [selectedDate]);

  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 30; i++) {
      dates.push(dayjs().add(i, "day"));
    }
    return dates;
  };
  const [dates] = useState(generateDates());

  const rescheduleSelectedTimeSlot = async (time, id) => {
    const response = await updateRequestTimeSlot(id, time);

    if (response?.request) {
      setAllPlannedRequest((prev) =>
        prev.map((request) =>
          request._id === response.request._id
            ? {
                ...request,
                requestedDate: response.request.requestedDate,
                scheduledDate: response.request.scheduledDate,
              }
            : request
        )
      );
    } else {
      console.error("Failed to update request:", response.error);
    }
  };

  const confirmRequestsFn = async () =>{
    try{
      const updatedRequests = await Promise.all(
        allPlannedRequests.map((request) =>
          updateRequestStatus(request._id, "scheduled")
        )
      );
      const successfulUpdates = updatedRequests.filter(
        (res) => !res.error
      );
      setAllPlannedRequest((prevRequests) =>
        prevRequests.map((req) =>
          successfulUpdates.find((updated) => updated.data._id === req._id)
            ? { ...req, status: "scheduled" }
            : req
        )
      );
    }catch (error) {
      console.error("Error confirming requests:", error);
    }
  }

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex justify-between items-center sm:justify-center">
        <h1 className="section-heading mt-5">Planning View</h1>
        <div className="block sm:hidden">
          <Dropdown
            values={dates.map((date) => date.format("MM/DD/YYYY"))}
            setSelectedValue={setSelectedDate}
          />
        </div>
      </div>
      <div className="flex gap-20">
        <div className="hidden sm:block sm:w-[20%]">
          <DateView
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            dates={dates}
          />
        </div>
        <div className="bg-slate-500 w-[100%] sm:w-[calc(100%-20%)]">
          <PlanningHeader selectedDate={selectedDate} />
          <PlanningCards
            allPlannedRequests={allPlannedRequests}
            rescheduleSelectedTimeSlot={rescheduleSelectedTimeSlot}
          />
          {allPlannedRequests.length > 0 && (
            <div className="text-center mt-10">
              <PrimaryBtn text={"Confirm Request"} onClickFn={confirmRequestsFn}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Planning;
