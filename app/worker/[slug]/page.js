"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { handleError, handleSuccess } from "@/frontend_utalties/notfication_control";
import Link from "next/link";
import WrkrBnCLoader from "@/component/loader";

export default function WorkerDetails() {
  const router = useRouter();
  const { slug } = useParams();
  const [worker, setWorker] = useState({});
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchWorkerDetails = async () => {
      try {
        const resp = await axios.get(`http://localhost:3001/getworkerdata/${slug}`)
        if (resp.data.success) {
          setWorker({ ...resp.data.data, services: resp.data.data.services || [] })
          handleSuccess("Worker details loaded successfully.");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching worker details:", error);
        handleError("Failed to load worker details. Please try again later.");
      }
    }
    if (slug) fetchWorkerDetails();
  }, [slug])

  const hire = () => {
    handleSuccess("Service booked successfully!");
  }
  const connection = () => {
    handleSuccess("Request to contact worker sent successfully!");
  }

  if (isLoading) {
    return <WrkrBnCLoader />
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">

      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-30"></div>

      <div className="py-20 px-6 relative z-10">
        {/* TOP CARD */}
        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200 overflow-hidden">

          <div className="md:flex">

            {/* Image */}
            <div className="md:w-1/2 relative">
              <Image
                src={worker.Profile_Pic}
                alt='worker '
                width={300}
                height={200}
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-green-600 text-white px-4 py-1 rounded-lg shadow">
                ✔ Verified Worker
              </div>
            </div>

            {/* Info */}
            <div className="md:w-1/2 p-10 flex flex-col justify-center">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                {worker.First_Name} {worker.Last_Name}
              </h1>
              <p className="text-blue-700 font-semibold text-lg mt-1">
                {worker.Profession}
              </p>



              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-6 items-center">
                {/* <span className="text-gray-700 font-medium">
                  {worker.completedJobs}+ Jobs Completed
                </span> */}
                <span className="text-green-700 font-semibold">
                  🛡️ Trusted Service Provider
                </span>
              </div>

              {/* Buttons */}
              <div className="mt-10 flex gap-4 flex-wrap">
                <Link href={`/hireworker/${worker._id}`}>
                  <button onClick={hire} className="bg-blue-700 text-white px-8 py-4 rounded-xl text-lg shadow-lg hover:bg-blue-800 transition-all">
                    Hire Worker
                  </button>
                </Link>

                <Link href={`/contactworker/${worker._id}`}>
                  <button onClick={connection} className="border border-blue-700 text-blue-700 px-8 py-4 rounded-xl text-lg hover:bg-blue-50 transition-all">
                    Contact
                  </button></Link>
              </div>

            </div>
          </div>
        </div>

        {/* SERVICES */}
            <h2 className="text-4xl mt-5 font-bold text-gray-900 mb-10 text-center"> Services Offered </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {worker.services.length > 0 ? (
            worker.services.map((service, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>

                <p className="text-gray-600 mt-3 text-lg leading-relaxed">
                  {service.details}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-blue-700">
                    Rs {service.price}
                  </span>
                  <button className="bg-green-600 text-white px-5 py-3 rounded-xl font-medium shadow hover:bg-green-700 transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xl font-semibold text-gray-600 col-span-full">
              No services provided.
            </p>
          )}
        </div>


        <div className="max-w-6xl mx-auto mt-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">
            Experience / Portfolio
          </h2>

          {worker.portfolio && worker.portfolio.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {worker.portfolio.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <Image
                    src={item.image}
                    alt="portfolio"
                    width={400}
                    height={200}
                    className="rounded-xl object-cover w-full h-48"
                  />

                  <h3 className="text-2xl font-bold text-gray-900 mt-4">
                    {item.title}
                  </h3>


                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-xl font-semibold text-gray-600">
              No experience or portfoli available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
