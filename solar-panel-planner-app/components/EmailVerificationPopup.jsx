import React, { useState } from "react";

const EmailVerificationPopup = ({ isActivePopup }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {
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
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to send OTP");
    }
  };

  const validateOtp = async () => {
    try{
      const response = await fetch("/api/validateOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      if(!response.ok){
        const errData = await response.json();
        throw new Error(errData?.error || "Failed to validate OTP")
      }

      const responseResult = await response.json();
      window.location.href = `/request/${responseResult.data._id}`;
    }catch(err){
      setMessage(err.message || "Failed to validate OTP");
    }
  };
  return (
    <div
      className="w-screen h-screen z-10 relative overflow-hidden bg-opacity-50"
      onClick={() => isActivePopup(false)}
    >
      <div
        className="h-[30%] w-[30%] absolute inset-0 m-auto bg-blue-500"
        onClick={(e) => e.stopPropagation()}
      >
        {step === 1 && (
          <div>
            <h2>Enter your email</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSendOtp}>Send OTP</button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2>Enter the OTP sent to your email</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={validateOtp}>Validate OTP</button>
          </div>
        )}


        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default EmailVerificationPopup;
