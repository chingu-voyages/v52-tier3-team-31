import React from "react";
import { howItWorksContent } from "./howItWorksContent";
import HowItWorksCard from "./HowItWorksCard";
const HowItWorks = () => {
  return (
    <section>
      <div className=" px-6 py-24 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base/7 font-semibold text-secondary-light">
            Get your solar panel installations evaluted in 3 easy steps
          </p>
          <h2 className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            How it works
          </h2>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
          <div className="p-6 grid lg:grid-cols-3 gap-8">
            {howItWorksContent.map((content, idx) => {
              return <HowItWorksCard key={idx} content={content} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
