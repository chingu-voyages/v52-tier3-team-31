import React from "react";
import { getRequestById } from "@/app/actions/requestActions";
import RequestDetailMap from "@/components/RequestDetailMap";
import { auth } from "@/auth";
import RequestDetailsBtns from "./RequestDetailsBtns";
const page = async ({ params }) => {
  const request = await getRequestById(params.id);
  const {
    name,
    email,
    phone,
    address,
    requestedDate,
    scheduledDate,
    status,
    _id,
  } = request.data;
  const session = await auth();
  return (
    <div>
      <h1 className="page-heading">Request Details</h1>
      {request && request.data ? (
        <div className="flex flex-col  w-screen md:px-20 lg:px-40 xl:px-80 justify-stretch md:gap-2 mb-8">
          <div className="flex flex-col sm:flex-row gap-2 mb-2 justify-center">
            <div
              className={` bg-gray-50 md:rounded-2xl p-8 text-center flex-col justify-center ${
                status === "visited" || status === "cancelled" ? "w-full" : ""
              }`}
            >
              <div className=" flex flex-col sm:flex-row gap-4 justify-between">
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
              </div>
            </div>
            {!(status === "visited" || status === "cancelled") && (
              <RequestDetailsBtns session={session} requestId={_id} />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <dl className="bg-gray-50 md:rounded-2xl p-8 flex flex-col gap-8 justify-center text-center">
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
              <div>
                <dt className="form-label">Address</dt>
                <dd className="text-xl">{address}</dd>
              </div>
            </dl>
            <div className="w-full">
              <RequestDetailMap address={address} />
            </div>
          </div>
        </div>
      ) : (
        <p className="page-subheading">No request found for ID : {params.id}</p>
      )}
    </div>
  );
};

export default page;
