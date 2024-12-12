import React from "react";
import { getRequestById } from "@/app/actions/requestActions";
import RequestDetailMap from "@/components/RequestDetailMap";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";
import { auth } from "@/auth";
const page = async ({ params }) => {
  const request = await getRequestById(params.id);
  const { name, email, phone, address, requestedDate, scheduledDate, status } =
    request.data;
  const session = await auth();
  console.log(request);
  return (
    <div>
      <h1 className="page-heading">Request Details</h1>
      {request && request.data ? (
        <div className="flex flex-col  w-screen justify-center md:px-20 lg:px-40 xl:px-80">
          <div className="flex flex-col gap-2 sm:flex-row">
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
              <div>
                <dt className="form-label">Address</dt>
                <dd className="text-xl">{address}</dd>
              </div>
            </dl>
            <div className="w-full">
              <RequestDetailMap address={address} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 my-4 justify-between  ">
            <div className="form-section text-center flex-col justify-center">
              <div className=" flex flex-col sm:flex-row gap-4">
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
            <div className="form-section flex gap-2 justify-center ">
              {session && session?.user ? (
                <PrimaryBtn text={"Mark As Visited"} />
              ) : (
                <PrimaryBtn text={"Edit Request"} />
              )}
              <PrimaryBtn text={"Cancel Request"} />
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
