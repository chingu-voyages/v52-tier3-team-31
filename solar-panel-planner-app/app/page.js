"use client";
import { useState } from "react";
import EmailVerificationPopup from "@/components/EmailVerificationPopup";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  const [showEmailVerify, setShowEmailVerify] = useState(false);
  return (
    <div className="mx-auto 2xl:max-w-[80%] 2xl:px-8">
      {showEmailVerify && (
        <EmailVerificationPopup isActivePopup={setShowEmailVerify} />
      )}
      <HeroSection setShowEmailVerify={setShowEmailVerify} />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}
