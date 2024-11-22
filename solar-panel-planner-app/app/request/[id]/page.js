import React from "react";
import { getRequestById } from "@/app/actions/requestActions";

const page = async ({ params }) => {
  const request = await getRequestById(params.id);
  return (
    <div>
      <h1 className="page-heading">Request Details</h1>
      {request && request.data ? (
        <p className="page-subheading">Request ID: {request.data._id}</p>
      ) : (
        <p className="page-subheading">No request found for this ID</p>
      )}
    </div>
  );
};

export default page;
