"use client";
import React from "react";
import PrimaryBtn from "../buttons/PrimaryBtn";
import OutlinedBtn from "../buttons/OutlinedBtn";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();

  const handleNewRequest = () => {
    router.push("/request/new");
  };

  const handleManageRequest = () =>{
    router.push("/planning")
  }

  return (
    <div className="relative w-full h-[60vh] bg-bannerImg bg-cover bg-center">
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="relative flex flex-col sm:flex-row items-center sm:items-end justify-end sm:justify-between h-full p-4 sm:p-10 gap-10">
        <div className="rounded-lg bg-white/30 p-6 w-full sm:w-2/5">
          <h1 className="text-white text-4xl mb-3">
            Effortless Solar Planning for a Brighter Future
          </h1>
          <p className="text-slate-300">
            Schedule your solar panel evaluation with ease, and let us handle
            the rest. Join Los Angeles' mission to embrace sustainable energy
            today!
          </p>
        </div>
        <div className="flex flex-row sm:flex-col">
          <PrimaryBtn text="New Request" onClickFn={handleNewRequest} />
          <OutlinedBtn
            text="Mange Request"
            onClickFn={handleManageRequest}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
