import React from "react";
import RequestList from "@/components/request/RequestList";
import Search from "@/components/Search";

const page = async ({ searchParams }) => {
  const query = searchParams?.query || "";
  const currentPage = searchParams?.page || 1;
  const limit = searchParams.limit || 10;

  return (
    <div>
      <h1 className="page-heading">All Requests</h1>
      <div className="flex gap-2 mx-auto mb-8 w-1/2 ">
        <Search />
      </div>

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
