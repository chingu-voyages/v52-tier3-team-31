"use client";
import React, { useState } from "react";
import DateSelector from "@/components/newRequst/DateSelector";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createRequest } from "@/app/actions/requestActions";
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
  const [formData, setFormData] = useState(initialFormData);
  const [selectedDateSlot, setSelectedDateSlot] = useState(null);
  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleReset = () => {
    setFormData(initialFormData);
    setSelectedDateSlot(null);
    setErrors({});
  };

  const handleFormChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "address" && value.length > 2) {
      try {
        const response = await axios.get(
          "https://api.opencagedata.com/geocode/v1/json",
          {
            params: {
              q: value,
              key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY,
              limit: 5,
              language: "en",
              bounds: "-118.668404,33.703652,-118.155289,34.337306",
            },
          }
        );

        if (response.data && response.data.results) {
          setSuggestions(response.data.results);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching address suggestions:", error);
      }
    } else {
      setSuggestions([]);
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

    if (!formData.address.trim()) {
      newErrors.address = "Address Line 1 is required.";
    }

    if (!selectedDateSlot) {
      newErrors.requestedDate = "Preferred date and time slot are required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      requestedDate: selectedDateSlot,
    };

    const isValid = validateFields();

    if (isValid) {
      try {
        await createRequest(updatedFormData);
        handleReset();
        setShowSuccess(true);
        toast("Your request has been submitted!");
      } catch (error) {
        console.log("Failed to create request", error.message);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData((prev) => ({
      ...prev,
      address: suggestion.formatted,
      location: {
        type: "Point",
        coordinates: [suggestion.geometry.lat, suggestion.geometry.lng],
      },
    }));
    setSuggestions([]);
  };

  return (
    <div>
      {showSuccess ? (
        <NewRequestSuccess />
      ) : (
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
                <p className="form-label">Address</p>
                <input
                  type="text"
                  name="address"
                  className="form-field"
                  value={formData.address}
                  onChange={handleFormChange}
                />
                {suggestions.length > 0 && (
                  <ul className="border border-gray-300 rounded-md mt-2 bg-white">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {suggestion.formatted}
                      </li>
                    ))}
                  </ul>
                )}
                {errors.address && <p className="">{errors.address}</p>}
              </div>
            </div>
            <div className="form-section form-box">
              <p className="form-label">Select Date for Inspection</p>
              <DateSelector
                onDateSlotConfirm={(selectedDate, selectedSlot) => {
                  const formattedSlot = `${selectedDate} ${selectedSlot.start}`;
                  setSelectedDateSlot(formattedSlot);
                }}
              />
              {errors.requestedDate && (
                <p className="">{errors.requestedDate}</p>
              )}
            </div>
            <div className="w-full flex gap-5 justify-center">
              <button
                className="rounded-md bg-secondary-light px-8 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                type="submit"
              >
                Submit
              </button>
              <button
                className="rounded-md bg-red-100 px-8 py-2.5 text-md font-semibold text-red-600 shadow-sm hover:bg-red-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Request;
