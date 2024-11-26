"use client";
import { createRequest } from "@/app/actions/requestActions";
import DateSelector from "@/components/newRequst/DateSelector";
import React, { useState } from "react";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  requestedDate: "",
};

const initialAddressFields = {
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
};

const Request = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [addressFields, setAddressFields] = useState(initialAddressFields);
  const [selectedDateSlot, setSelectedDateSlot] = useState(null);
  const [errors, setErrors] = useState({});

  const handleReset = () => {
    setFormData(initialFormData);
    setAddressFields(initialAddressFields);
    setSelectedDateSlot(null);
    setErrors({});
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];

      setAddressFields((prev) => ({
        ...prev,
        [addressField]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number. Must be 10 digits.";
    }

    if (!addressFields.address1.trim()) {
      newErrors.address1 = "Address Line 1 is required.";
    }
    if (!addressFields.city.trim()) {
      newErrors.city = "City is required.";
    }
    if (!addressFields.state.trim()) {
      newErrors.state = "State is required.";
    }
    if (!addressFields.zip.trim()) {
      newErrors.zip = "ZIP Code is required.";
    }

    if (!selectedDateSlot) {
      newErrors.requestedDate = "Preferred date and time slot are required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullAddress = `${addressFields.address1} ${addressFields.address2} ${addressFields.city}, ${addressFields.state}, ${addressFields.zip}`;
    const updatedFormData = {
      ...formData,
      address: fullAddress,
      requestedDate: selectedDateSlot,
    };

    const isValid = validateFields();

    if (isValid) {
      try {
        console.log(updatedFormData);
        const response = await createRequest(updatedFormData);
        console.log(response);
        handleReset();
      } catch (error) {
        console.log("Failed to create request", error.message);
      }
    }
  };

  return (
    <div className="w-[90%] max-w-[40vw] mx-auto mt-10 mb-10">
      <h1 className="section-heading">New Evaluation Request</h1>
      <p className="page-subheading">
        Please fill your details below and provide a preferred time slot for
        visit.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-box">
            <p className="form-label">Full Name</p>
            <input
              type="text"
              name="name"
              className="form-field"
              value={formData.name}
              onChange={handleFormChange}
            />
            {errors.name && <p className="">{errors.name}</p>}
          </div>
          <div className="form-box">
            <p className="form-label">Email Address</p>
            <input
              type="email"
              name="email"
              className="form-field"
              value={formData.email}
              onChange={handleFormChange}
            />
            {errors.email && <p className="">{errors.email}</p>}
          </div>
          <div>
            <p className="form-label">Phone Number</p>
            <input
              type="number"
              name="phone"
              className="form-field"
              value={formData.phone}
              onChange={handleFormChange}
            />
            {errors.phone && <p className="">{errors.phone}</p>}
          </div>
        </div>
        <div className="form-section">
          <div className="form-box">
            <p className="form-label">Address Line 1</p>
            <input
              type="text"
              name="address.address1"
              className="form-field"
              value={addressFields.address1}
              onChange={handleFormChange}
            />
            {errors.address1 && <p className="">{errors.address1}</p>}
          </div>
          <div className="form-box">
            <p className="form-label">Address Line 2</p>
            <input
              type="text"
              name="address.address2"
              className="form-field"
              value={addressFields.address2}
              onChange={handleFormChange}
            />
          </div>
          <div className="flex gap-3">
            <div>
              <p className="form-label">City</p>
              <input
                type="text"
                name="address.city"
                className="form-field"
                value={addressFields.city}
                onChange={handleFormChange}
              />
              {errors.city && <p className="">{errors.city}</p>}
            </div>
            <div>
              <p className="form-label">State</p>
              <input
                type="text"
                name="address.state"
                className="form-field"
                value={addressFields.state}
                onChange={handleFormChange}
              />
              {errors.state && <p className="">{errors.state}</p>}
            </div>
            <div>
              <p className="form-label">ZIP Code</p>
              <input
                type="text"
                name="address.zip"
                className="form-field"
                value={addressFields.zip}
                onChange={handleFormChange}
              />
              {errors.zip && <p className="">{errors.zip}</p>}
            </div>
          </div>
        </div>
        <div className="form-section form-box">
          <p className="form-label">Preferred Timeslot</p>
          <DateSelector
            onDateSlotConfirm={(selectedDate, selectedSlot) => {
              const formattedSlot = `${selectedDate} ${selectedSlot.start}`;
              setSelectedDateSlot(formattedSlot);
            }}
          />
          {errors.requestedDate && <p className="">{errors.requestedDate}</p>}
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="button">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default Request;
