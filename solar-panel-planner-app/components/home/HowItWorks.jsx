import React from "react";
import { howItWorksContent } from "./howItWorksContent";

const HowItWorks = () => {
  return (
    <div className="my-16 p-10 bg-slate-500">
      <h1 className="text-4xl text-center mb-10 text-white">HOW IT WORKS</h1>
      <div className="flex flex-col justify-center sm:justify-between gap-8 sm:flex-row">
        {howItWorksContent.map((content, idx) => {
            const Icone = content.icone
            return (
                <div key={idx} className="w-full sm:w-1/4 text-center flex flex-col items-center">
                  <Icone className="text-yellow-500 h-12 w-12 mb-3" />
                  <p className="text-white">{content.text}</p>
                </div>
              )
        })}
      </div>
    </div>
  );
};

export default HowItWorks;
