import React from "react";

const PrimaryBtn = ({ text, onClickFn, isDisabled = false }) => {
  return (
    <button
      className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg 
        text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none focus:ring-0 dark:focus:ring-0 ${
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      onClick={onClickFn}
      type="submit"
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default PrimaryBtn;
