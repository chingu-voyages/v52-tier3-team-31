import React from "react";
import RequestCard from "./RequestCard";
import { fetchFilteredRequests } from "@/app/actions/requestActions";
import Pagination from "../Pagination";

const RequestList = async ({ query, currentPage, limit }) => {
  const filteredRequests = await fetchFilteredRequests(
    query,
    currentPage,
    limit
  );

  if (!filteredRequests || filteredRequests.data.length === 0) {
    return <h1 className="text-lg text-center">🥹 No requests found</h1>;
  }

  const totalPages = Math.ceil(filteredRequests.totalResults / limit);

  return (
    <div>
      {filteredRequests.data && (
        <>
          {query != "" && (
            <h1 className="text-lg text-center">
              Found <strong>{filteredRequests.totalResults}</strong>{" "}
              {filteredRequests.totalResults > 1 ? "results " : "result "}
              for "<strong>{query}</strong>"
            </h1>
          )}
          <div className="grid lg:grid-cols-2 gap-4 px-4 md:px-28 py-8">
            {filteredRequests.data.map((request) => (
              <RequestCard key={request._id} request={request} />
            ))}
          </div>
          {totalPages > 0 && <Pagination totalPages={totalPages} />}
        </>
      )}
    </div>
  );
};

export default RequestList;
