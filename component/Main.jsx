import React from "react";
import Services from "./Services";
import ProcessChart from "./ProcessChart";
import Footer from "./Footer";

const Main = () => {
  return (
    <>
     <div className="bg-gray-100 text-white text-center">
      <h1
        id="services"
        className="text-3xl sm:text-4xl text-center text-black font-bold py-5"
      >
        We <span className="text-pink-500">Offer</span>
      </h1>

      <p className="text-center max-w-2xl mx-auto px-4 font-semibold text-gray-700">
        WrkrBnC connects you with verified local professionals for home and
        commercial services — book skilled workers instantly with secure
        payments and real-time tracking.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        <Services
          title="AC Repairing"
          dis="Expert AC mechanic services for quick repairs, maintenance, and installations. Reliable, affordable, and efficient solutions to keep you cool and comfortable. Book now for fast, professional service at your doorstep."
          pic="smart-ac.png"
        />
        <Services
          title="Fast Plumbing"
          dis="Certified plumber available for emergency repair, pipe installation, bathroom fittings, and leak detection. Affordable, trusted services near you. Hire expert local plumbers now on WrkrBnc—fast and reliable."
          pic="repair-worker.png"
        />
        <Services
          title="Labor Near You"
          dis="Hire skilled and unskilled labor workers for construction, loading, shifting, and general tasks. Fast, affordable, and reliable labor services near you. Book trusted workers today on WrkrBnc with ease."
          pic="labor.png"
        />
        <Services
          title="Gardening Crew"
          dis="Hire professional gardeners for lawn care, landscaping, and garden cleanup. Affordable, skilled gardening services near you. Book trusted local gardeners now on WrkrBnc for a greener space."
          pic="gardener.png"
        />
        <Services
          title="Power Fix"
          dis="Hire certified electricians for wiring, lighting, fan installation, and electrical repairs. Fast, safe, and affordable service near you. Book expert electricians today on WrkrBnc for reliable power solutions."
          pic="electrician.png"
        />
        <Services
          title="Quick Clean"
          dis="Hire professional cleaners for home, office, and deep cleaning services. Affordable, hygienic, and fast cleaning near you. Book trusted cleaning experts today on WrkrBnc for a spotless space."
          pic="cleaning.png"
        />
        <Services
          title="Wood Experts"
          dis="Hire skilled carpenters for furniture repair, custom woodwork, door fitting, and cabinet installation. Affordable, reliable services near you. Book professional today on WrkrBnc for quality craftsmanship."
          pic="carpenter.png"
        />
      </div>
      </div>

      <ProcessChart />
      <Footer/>
    </>
  );
};

export default Main;
