import React from "react";

const Request = () => {
  return (
    <div className="w-[90%] max-w-[40vw] mx-auto mt-10 mb-10">
      <h1 className="section-heading">New Evaluation Request</h1>
      <p className="page-subheading">
        Please fill your details below and provide a preferred time slot for
        visit.
      </p>

      <div className="form-section">
        <div className="form-box">
          <p className="form-label">Full Name</p>
          <input type="text" className="form-field" />
        </div>
        <div className="form-box">
          <p className="form-label">Email Address</p>
          <input type="email" className="form-field" />
        </div>
        <div>
          <p className="form-label">Phone Number</p>
          <input type="number" className="form-field" />
        </div>
      </div>
      <div className="form-section">
        <div className="form-box">
          <p className="form-label">Address Line 1</p>
          <input type="text" className="form-field" />
        </div>
        <div className="form-box">
          <p className="form-label">Address Line 2</p>
          <input type="text" className="form-field" />
        </div>
        <div className="flex gap-3">
          <div>
            <p className="form-label">City</p>
            <input type="text" className="form-field"/>
          </div>
          <div>
            <p className="form-label">State</p>
            <input type="text" className="form-field"/>
          </div>
          <div>
            <p className="form-label">ZIP Code</p>
            <input type="text" className="form-field"/>
          </div>
        </div>
      </div>
      <div className="form-section form-box">
        <p className="form-label">Preferred Timeslot</p>
        <div className="flex gap-3">
        <input type="date" />
        <div>Time</div>
        </div>
      </div>
      <div>
        <button>Submit</button>
        <button>Reset</button>
      </div>
    </div>
  );
};

export default Request;
