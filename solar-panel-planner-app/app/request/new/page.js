import React from "react";

import RequestForm from "@/components/request/RequestForm";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  location: {},
  requestedDate: "",
};

const Request = () => {
 

  return (
    <div className="w-[90%] max-w-[40vw] mx-auto mt-10 mb-10">
      <h1 className="section-heading">New Evaluation Request</h1>
      <p className="page-subheading">
        Please fill your details below and provide a preferred time slot for
        visit.
      </p>

      <RequestForm initialFormData={initialFormData}/>
    </div>
  );
};

export default Request;
