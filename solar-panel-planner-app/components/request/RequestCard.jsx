import React from "react";

const RequestCard = ({ request }) => {
  const { name, email, phone, address, requestedDate, scheduledDate, status } =
    request;

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex gap-2 justify-between">
          <h1 className="text-xl">{scheduledDate.toLocaleString()}</h1>
          <span className="text-xl btn bg-secondary-light w-fit mx-auto text-white px-2 rounded-md ">
            {status}
          </span>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-5 sm:p-6">
        <div className="">
          <dl className=" flex flex-col gap-8 justify-center text-center">
            <div className="flex gap-2 justify-start align-top">
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
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
