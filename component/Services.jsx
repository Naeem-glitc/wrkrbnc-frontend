import Link from "next/link";
import React from "react";

const Services = ({ title, pic, dis }) => {
  return (
    <div className="group relative flex flex-col justify-between h-auto sm:h-[60vh] w-full max-w-md mx-auto rounded-2xl shadow-xl p-6 m-4 bg-white/90 backdrop-blur-lg border-2 border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-500">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={pic}
          alt="Service"
          className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-full border-2 border-emerald-300  shadow-md"
        />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-emerald-600 transition duration-300">
          {title}
        </h1>
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed text-justify">
        {dis}
      </p>

      {/* Button */}
      <Link href={'/login'} ><button className="mt-6 self-start px-6 py-2.5 text-sm sm:text-base font-semibold rounded-xl bg-amber-500 text-white hover:bg-amber-600 cursor-pointer">
        Hire Me
      </button></Link>
    </div>

  );
};

export default Services;
