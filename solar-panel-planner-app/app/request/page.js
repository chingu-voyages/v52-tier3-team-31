import React from "react";
import { getAllRequests } from "@/app/actions/requestActions";

const Request = async () => {
  const requests = await getAllRequests();
  return (
    <div>
      <h1 className="page-heading">All Requests</h1>
      {requests && requests.data ? (
        <p className="page-subheading">Total Requests {requests.data.length}</p>
      ) : (
        <p className="page-subheading">No requests found.</p>
      )}
    </div>
  );
};

export default Request;
