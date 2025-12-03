"use client";
import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-blue-50">
      
      {/* Hero Section */}
      <div className="bg-blue-700 text-white py-20 px-6 text-center shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-wide">
          About WorkerBNC
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-blue-100">
          Connecting skilled professionals with trusted customers across Pakistan.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-16 px-6">

        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold border-l-8 border-amber-400 pl-4">
            Our Mission
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            At WorkerBNC, our goal is simple — provide a reliable platform where
            customers can easily hire skilled workers, while also giving workers 
            an opportunity to grow their income and build trust through quality service.
          </p>
        </section>

        {/* Why Pick Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold border-l-8 border-emerald-500 pl-4">
            Why Choose WorkerBNC?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">

            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-amber-400 hover:shadow-xl transition">
              <h3 className="text-xl font-bold text-blue-700 mb-2">
                Verified Workers
              </h3>
              <p className="text-gray-600">
                Every worker is verified and checked to ensure reliable service.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-500 hover:shadow-xl transition">
              <h3 className="text-xl font-bold text-blue-700 mb-2">
                Affordable Pricing
              </h3>
              <p className="text-gray-600">
                Hire top skilled workers at fair and affordable prices.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-600 hover:shadow-xl transition">
              <h3 className="text-xl font-bold text-blue-700 mb-2">
                Fast & Reliable
              </h3>
              <p className="text-gray-600">
                Find nearby workers instantly with our smooth search system.
              </p>
            </div>

          </div>
        </section>

        {/* Our Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold border-l-8 border-blue-600 pl-4">
            The WorkerBNC Team
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            We are a dedicated and passionate team focused on improving the
            experience of hiring and working. We aim to empower local workers 
            across Pakistan — bringing modern tools, trust, and opportunities 
            to skilled professionals.
          </p>
        </section>

        {/* Footer */}
        <div className="text-center mt-20">
          <p className="text-blue-700 font-semibold">
            © {new Date().getFullYear()} WorkerBNC — All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
