import dayjs from "dayjs";
import ViewToggleSwitch from "./ViewToggleSwitch";
import { FaFilePdf } from "react-icons/fa";
const PlanningHeader = ({ selectedDate, toggleView, exportToPDF }) => {
  const handleViewSwitch = (showMap) => {
    toggleView(showMap);
  };

  return (
    <div className="flex justify-between p-4 border-b-2 shadow-sm  ">
      <div className="self-center">
        <h1 className="text-2xl font-semibold text-black ">
          Visit Schedule for{" "}
          <span className="text-nowrap bg-primary-dark text-white px-2 py-1 rounded-lg">
            {dayjs(selectedDate).format("D MMMM YYYY")}
          </span>
        </h1>
      </div>
      <div>
        <div className="flex gap-2 items-center">
          <ViewToggleSwitch handleViewSwitch={handleViewSwitch} />
          <button
            className="rounded-md border p-2 text-sm inline-flex items-center gap-2 hover:bg-gray-100"
            onClick={exportToPDF}
          >
            <FaFilePdf />
            Export to PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanningHeader;
