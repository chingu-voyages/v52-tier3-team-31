"use client"
import DateView from "@/components/planning/DateView";
import PlanningCards from "@/components/planning/PlanningCards";
import React, { useState } from "react";
const dates = [1, 2, 3, 4, 5];

const Planning = () => {
  const [selectedDate, setSelectedDate] = useState(10);
  return (
    <div>
      <h1 className="section-heading mt-5">Planning View</h1>
      <div className="flex gap-20">
        <DateView dates={dates} setSelectedDate={setSelectedDate} />
        <div className="bg-slate-500 sm:w-[calc(100%-20%)]">
          <div className="flex justify-between">
            <div>
              <h3>Visit Schedule</h3>
              <div>{selectedDate} November</div>
            </div>
            <div>
              <div className="flex gap-2">
                <p>View As</p>
                <button>Map</button>
              </div>
              <div className="flex gap-2">
                <p>Export</p>
                <div>
                  <button>PDF</button>
                  <button>XLSX</button>
                </div>
              </div>
            </div>
          </div>
          <PlanningCards />
        </div>
      </div>
    </div>
  );
};

export default Planning;
