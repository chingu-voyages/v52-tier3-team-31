import React from "react";

const Button = ({ icon, title, onClick, type, href }) => {
  const onClickHandler = onClick || null;
  const buttonType = type || "primary";
  const buttonStyle = {
    primary:
      "bg-secondary-light hover:bg-orange-600 focus-visible:outline-orange-400 text-white",
    destructive:
      "bg-red-500 hover:bg-red-600 focus-visible:outline-red-500 text-white",
    secondary:
      "bg-gray-200 hover:bg-gray-300 focus-visible:outline-gray-300 text-black",
  };

  return (
    <button
      className={`rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${buttonStyle[buttonType]}`}
      onClick={onClickHandler}
    >
      <span className="inline-flex items-center gap-1">
        {icon}
        {title}
      </span>
    </button>
  );
};

export default Button;
