"use client";
import { useState, useEffect } from "react";
import { GrSend, GrValidate } from "react-icons/gr";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function EmailVerificationModal() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkIsValidEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  useEffect(() => {
    setIsValidEmail(checkIsValidEmail(email));
  }, [email]);

  const handleModalClose = () => {
    setEmail("");
    setIsValidEmail(false);
    setOtp("");
    setStep(1);
    setMessage("");
    setIsLoading(false);
    setShowModal(false);
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/sendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to send OTP");
      }

      const responseData = await response.json();
      setMessage(responseData.message);
      setIsLoading(false);
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to send OTP");
      setIsLoading(false);
    }
  };

  const validateOtp = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/validateOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      if (!response.ok) {
        const errData = await response.json();

        throw new Error(errData?.error || "Failed to validate OTP");
      }
      const responseResult = await response.json();
      setIsLoading(false);
      window.location.href = `/request/${responseResult.data._id}`;
    } catch (err) {
      setIsLoading(false);
      setMessage(err.message || "Failed to validate OTP");
    }
  };

  return (
    <>
      <button
        className="rounded-md border-2 border-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Manage Existing Booking
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className="relative w-auto my-6 mx-auto max-w-xl min-w-[30%]">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between py-4 px-8 rounded-t border-b border-gray-200">
                  <h3 className="text-2xl font-semibold">
                    Manage Existing Booking
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleModalClose}
                  >
                    <span className="bg-transparent text-black opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative py-4 px-8">
                  {step === 1 && (
                    <div className="flex flex-col gap-4">
                      <h2 className="font-semibold">
                        To access your existing booking, please verify your
                        email address.
                      </h2>
                      <input
                        type="email"
                        value={email}
                        placeholder="Type your email here"
                        className="border border-gray-200 p-2 rounded-md focus:outline-2 outline-orange-500"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                  )}
                  {step === 2 && (
                    <div className="flex flex-col gap-4">
                      <h2 className="">Enter the OTP sent to your email</h2>

                      <input
                        type="number"
                        value={otp}
                        className="border border-gray-200 p-2 rounded-md focus:outline-2 outline-orange-500 font-bold text-2xl tracking-widest"
                        min={1}
                        onChange={(e) => {
                          e.target.value.length <= 6 &&
                            e.target.value != "-" &&
                            setOtp(e.target.value);
                        }}
                      />
                    </div>
                  )}
                  {message && (
                    <div
                      className={`mt-2 font-semibold ${
                        !message.includes("success")
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {message}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between align-middle p-6 border-t border-gray-200  ">
                  <button
                    className="text-red-500 hover:text-red-700 font-bold uppercase px-6 py-1 text-sm outline-none"
                    type="button"
                    onClick={() => handleModalClose()}
                  >
                    Close
                  </button>
                  {step === 1 && (
                    <button
                      onClick={handleSendOtp}
                      className="rounded-md border-2 border-secondary-light px-3.5 py-1 text-sm font-semibold text-secondary-light shadow-sm  hover:text-orange-600 hover:border-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 disabled:border-gray-300 disabled:text-gray-300"
                      disabled={!isValidEmail}
                    >
                      <span className="inline-flex items-center gap-1">
                        {isLoading ? (
                          <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                          <GrSend />
                        )}
                        Send OTP
                      </span>
                    </button>
                  )}
                  {step === 2 && (
                    <span className="inlie-flex gap-2">
                      <button
                        onClick={validateOtp}
                        className="rounded-md border-2 border-green-500 px-3.5 py-1 text-sm font-semibold text-green-500 shadow-sm  hover:text-green-700 hover:border-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:border-gray-300 disabled:text-gray-300"
                        disabled={otp.length !== 6}
                      >
                        Validate OTP
                      </button>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
