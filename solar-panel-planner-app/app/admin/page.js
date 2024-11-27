import React from "react";
import { fetchFilteredRequests } from "@/app/actions/requestActions";
import RequestList from "@/components/request/RequestList";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";

const page = async ({ searchParams }) => {
  const query = searchParams?.query || "";
  const currentPage = searchParams?.page || 1;
  const limit = searchParams.limit || 5;

  return (
    <div>
      <h1 className="page-heading">All Requests</h1>
      <div className="flex gap-2 mx-auto mb-8 w-1/2 ">
        <Search />
        <Pagination />
      </div>

      {query != "" && (
        <h1 className="text-sm text-center">
          Showing results for{" "}
          <span className=" font-bold">{'"' + query + '"'}</span>
        </h1>
      )}
      <RequestList
        key={`${query}-${currentPage}`}
        query={query}
        currentPage={currentPage}
        limit={limit}
      />
    </div>
  );
};

export default page;
