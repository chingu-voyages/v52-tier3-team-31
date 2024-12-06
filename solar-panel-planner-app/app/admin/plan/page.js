"use client";
import DateView from "@/components/planning/DateView";
import dayjs from "dayjs";
import PlanningCards from "@/components/planning/PlanningCards";
import React, { useEffect, useState } from "react";
import PlanningHeader from "@/components/planning/PlanningHeader";
import Dropdown from "@/components/planning/Dropdown";
import { getAllPlanVisitRequests } from "@/app/actions/requestActions";

const Planning = () => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("MM/DD/YYYY")
  );
  const [allPlannedRequests, setAllPlannedRequest] = useState([]);

  useEffect(() => {
    let imageData = sessionStorage.getItem("map-image");
    if (imageData) {
      sessionStorage.removeItem("map-image");
    }

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

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex justify-between items-center sm:justify-center">
        <h1 className="section-heading mt-5">Planning View</h1>
        <div className="block sm:hidden">
          <Dropdown
            dates={dates}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
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
          <PlanningCards allPlannedRequests={allPlannedRequests} />
        </div>
      </div>
    </div>
  );
};

export default Planning;
