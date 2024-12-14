"use client";
import React, { useState } from "react";
import RequestForm from "@/components/request/RequestForm";
import NewRequestSuccess from "@/components/newRequst/NewRequestSuccess";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  location: {},
  requestedDate: "",
};

const Request = () => {
  const [submittedRequestId, setSubmittedRequestId] = useState(null);

  const showSuccessMessage = (requestId) => {
    setSubmittedRequestId(requestId);
  };

  return (
    <div>
      {submittedRequestId ? (
        <NewRequestSuccess requestId={submittedRequestId} />
      ) : (
        <div className="w-[90%] max-w-xl mx-auto mt-10 mb-10">
          <h1 className="section-heading">New Evaluation Request</h1>
          <p className="page-subheading">
            Please fill your details below and provide a preferred time slot for
            the visit.
          </p>
          <RequestForm
            initialFormData={initialFormData}
            showSuccessMessage={showSuccessMessage}
          />
        </div>
      )}
    </div>
  );
};

export default Request;
