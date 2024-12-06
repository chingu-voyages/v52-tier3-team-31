import React from "react";

const PlanningHeader = ({selectedDate}) => {
  return (
    <div className="flex justify-between">
      <div>
        <h3>Visit Schedule</h3>
        <div>{selectedDate}</div>
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
  );
};

export default PlanningHeader;
