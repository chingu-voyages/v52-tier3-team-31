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
  const [showSuccess, setShowSuccess] = useState(false);

  const showSuccessMessage = () => {
    setShowSuccess(true);
  };

  return (
    <>
      {showSuccess ? (
        <NewRequestSuccess />
      ) : (
        <div className="w-[90%] max-w-[40vw] mx-auto mt-10 mb-10">
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
    </>
  );
};

export default Request;
