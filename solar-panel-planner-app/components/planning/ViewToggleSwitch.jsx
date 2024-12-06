"use client";
import { useState } from "react";
import { FaList, FaMapMarked } from "react-icons/fa";

const ViewToggleSwitch = ({ handleViewSwitch }) => {
  const [showMap, setShowMap] = useState(false);

  const handleCheckboxChange = () => {
    setShowMap(!showMap);
    handleViewSwitch(!showMap);
  };

  return (
    <>
      <label className="relative sm:flex-col lg:flex lg:flex-row cursor-pointer select-none items-center justify-center rounded-md border">
        <input
          type="checkbox"
          className="sr-only"
          checked={showMap}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex items-center  rounded py-2 px-[18px] text-sm font-medium hover:bg-gray-50 ${
            !showMap ? "text-white bg-primary-dark" : "text-primary-dark"
          }`}
        >
          <FaList className="mr-2" />
          List
        </span>
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium hover:bg-gray-50  ${
            showMap ? "text-white bg-primary-dark" : "text-primary-dark"
          }`}
        >
          <FaMapMarked className="mr-2" />
          Map
        </span>
      </label>
    </>
  );
};

export default ViewToggleSwitch;
