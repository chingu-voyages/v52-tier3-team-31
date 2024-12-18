import Link from "next/link";
import dayjs from "dayjs";
const borderStatusColors = {
  new: "border-status-new",
  scheduled: "border-status-scheduled",
  cancelled: "border-status-cancelled",
  visited: "border-status-visited",
};

const RequestCard = ({ request }) => {
  const { name, email, phone, address, scheduledDate, status } = request;

  return (
    <Link
      href={`/request/${request._id}`}
      className={`overflow-hidden rounded-lg bg-white shadow-md border-l-8  ${borderStatusColors[status]} transition-transform hover:scale-[102%] flex-1`}
    >
      <div className="px-5 py-4 border-b bg-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2 text-lg font-semibold">
          📅 <span>{dayjs(scheduledDate).format("ddd D MMM YYYY hh:mmA")}</span>
        </div>
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full text-white ${
            status === "new"
              ? "bg-status-new"
              : status === "scheduled"
              ? "bg-status-scheduled"
              : status === "cancelled"
              ? "bg-status-cancelled"
              : "bg-status-visited"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="px-5 py-6 ">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xl">👤</span>
            <span className="text-gray-800 font-medium">{name}</span>
          </div>

          <div className="flex items-center gap-2 text-wrap">
            <span className="text-gray-500 text-xl">📧</span>
            <span className="text-gray-800">{email}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xl">📞</span>
            <span className="text-gray-800">{phone}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xl">🏠</span>
            <span className="text-gray-800">{address}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RequestCard;
