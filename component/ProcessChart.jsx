"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const ProcessChart = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
  title: "Browse Services",
  description: "Explore local services like electricians, plumbers, and cleaners.",
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
    >
      <path d="M10 2a8 8 0 015.29 13.71l4 4a1 1 0 01-1.42 1.42l-4-4A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z" />
      <rect x="7" y="7" width="3" height="3" rx="0.5" />
      <rect x="12" y="7" width="3" height="3" rx="0.5" />
      <rect x="7" y="12" width="3" height="3" rx="0.5" />
      <rect x="12" y="12" width="3" height="3" rx="0.5" />
    </svg>
  ),
},
{
  title: "Select a Worker",
  description: "Check profiles, ratings, and pricing to choose the right worker.",
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M4 20c0-3 4-5 8-5s8 2 8 5v1H4v-1z" />
    </svg>
  ),
},

    {
      title: "Book & Pay",
      description: "Book instantly and pay securely with transparency and safety.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
          viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10">
          <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" stroke="black" strokeWidth="1.5" />
          <circle cx="8" cy="13" r="1" />
          <circle cx="12" cy="13" r="1" />
          <circle cx="16" cy="13" r="1" />
        </svg>
      ),
    },
    {
      title: "Service Done",
      description: "Worker arrives, finishes job, and you rate the service.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
    }, 3000);
    return () => clearTimeout(timer);
  }, [activeStep]);

  return (
    <div className="">
  <div className="relative overflow-hidden p-4  bg-black backdrop-blur-lg border border-gray-100">
    {/* Decorative gradient background */}
    <div className="absolute inset-0 -z-10 bg-white"></div>

    <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-center   mb-8 relative pb-2">
      How We <span className="text-pink-500">Work</span> 
    
    </h2>

    {/* Horizontal Steps Row */}
    <div className="relative w-full flex justify-between items-center gap-2 sm:gap-6 lg:gap-12">
      {/* Connector line */}
      <div className="absolute top-10 left-0 right-0 h-1 bg-gradient-to-r from-pink-200 to-pink-200 z-0 rounded-full"></div>

      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex flex-col items-center text-center relative z-10 w-1/4 transition-all duration-500 ${
            index <= activeStep ? "opacity-100 scale-105" : "opacity-70"
          }`}
        >
          <div
            className={`flex items-center justify-center rounded-full shadow-lg mb-3 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 ${
              index <= activeStep
                ? "bg-gradient-to-br from-pink-400 to-pink-500 text-white"
                : "bg-gradient-to-br from-pink-100 to-pink-300 text-white"
            }`}
          >
            {step.icon}
          </div>
          <h3
            className={`text-xs sm:text-sm lg:text-lg font-semibold mb-1 ${
              index <= activeStep ? "text-pink-700" : "text-pink-500"
            }`}
          >
            {step.title}
          </h3>
          <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600">
            {step.description}
          </p>
        </div>
      ))}
    </div>

    {/* Active Step Button */}
    <div className="flex justify-center mt-6 sm:mt-10">
     <Link href="/login"><button className="bg-pink-500 px-4 py-2 sm:px-6 sm:py-3  hover:bg-pink-200 rounded-lg text-white font-bold text-xs sm:text-sm lg:text-base transition">
        {steps[activeStep].title}
      </button></Link>
    </div>
  </div>
</div>

  );
};

export default ProcessChart;
