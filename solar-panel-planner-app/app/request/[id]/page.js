import React from "react";
import { getRequestById } from "@/app/actions/requestActions";

const page = async ({ params }) => {
  const request = await getRequestById(params.id);
  const { name, email, phone, address, requestedDate, scheduledDate, status } =
    request.data;
  console.log(request);
  return (
    <div>
      <h1 className="page-heading">Request Details</h1>
      {request && request.data ? (
        <div>
          <dl className="form-section flex flex-col gap-8 justify-center text-center">
            <div>
              <dt className="form-label">Name</dt>
              <dd className="text-xl">{name}</dd>
            </div>
            <div>
              <dt className="form-label">Email</dt>
              <dd className="text-xl">{email}</dd>
            </div>
            <div>
              <dt className="form-label">Phone</dt>
              <dd className="text-xl">{phone}</dd>
            </div>
          </dl>

          <dl className="form-section flex flex-col gap-4 text-center mt-4">
            <div>
              <dt className="form-label">Appointment Date</dt>
              <dd className="text-xl">{scheduledDate.toLocaleString()}</dd>
            </div>
            <div>
              <dt className="form-label">Appointment Status</dt>
              <dd className="text-xl btn bg-secondary-light w-fit mx-auto text-white px-2 rounded-md ">
                {status.toUpperCase()}
              </dd>
            </div>
            <div>
              <dt className="form-label">Address</dt>
              <dd className="text-xl">{address}</dd>
            </div>
          </dl>
        </div>
      ) : (
        <p className="page-subheading">No request found for ID : {params.id}</p>
      )}
    </div>
  );
};

export default page;
