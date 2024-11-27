import React from "react";
import RequestCard from "./RequestCard";
import { fetchFilteredRequests } from "@/app/actions/requestActions";

const RequestList = async ({ query, currentPage, limit }) => {
  console.log(`RequestsList`);
  console.log(
    `***** Received query : ${query}, current: ${currentPage}, limit: ${limit}`
  );

  const filteredRequests = await fetchFilteredRequests(
    query,
    currentPage,
    limit
  );

  console.log(`NEW FILTERED REQUESTS COUNT : ${filteredRequests.length}`);
  return (
    <div>
      {filteredRequests ? (
        <>
          <div className="grid md:grid-cols-3 gap-4 bg-gray-50 px-20 py-8">
            {filteredRequests.map((request) => (
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
