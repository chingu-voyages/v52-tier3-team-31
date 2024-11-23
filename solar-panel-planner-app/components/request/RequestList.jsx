import React from "react";
import { getAllRequests } from "@/app/actions/requestActions";
import RequestCard from "./RequestCard";

const RequestList = async () => {
  const requests = await getAllRequests();

  return (
    <div>
      <h1 className="page-heading align">All Requests</h1>
      {requests && requests.data ? (
        <>
          <div className="grid md:grid-cols-3 gap-4 bg-gray-50 px-20 py-8">
            {requests.data.map((request) => (
              <RequestCard key={request._id} request={request} />
            ))}
          </div>
        </>
      ) : (
        <>
          <h1>No requests found </h1>
        </>
      )}
    </div>
  );
};

export default RequestList;
