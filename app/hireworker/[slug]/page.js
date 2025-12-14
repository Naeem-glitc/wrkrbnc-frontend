"use client"
import Image from 'next/image'
import Client_Navbar from '@/component/Client_Navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { User } from "lucide-react";
import Footer from '@/component/Footer';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import WrkrBnCLoader from '@/component/loader';
import API_BASE_URL from '@/config/api';


const Page = () => {
  const [worker, setWorker] = useState([]);
  const seachparam = useSearchParams();
  const query = seachparam.get("query");
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/get-all-workers`)
        if (response.data.success) {
          setWorker(response.data.data);
          setIsLoading(false);
        }else{
          setWorker([]);
          setIsLoading(false);
        }
        
      } catch (error) {
        console.error("error")
      
      }
    }

    fetchWorkers();
    
  }, []);

  useEffect(() => {
  if (!query) return;

  const searchworker = async () => {
    try {
      const resp = await axios.get(`${API_BASE_URL}/searchworker/search?query=${query}`);
      
      if (resp.data.success && resp.data.data.length > 0) {
        setWorker(resp.data.data);
      }else {

        setWorker([])
      }
    } catch (error) {
      console.error("something went wrong", error);

    }
  };

  searchworker(); 
}, [query]);

 

  


if(isLoading){
  return <WrkrBnCLoader />
}

  return (
    <>
      <Client_Navbar />
      <div className='bg-gray-50'>
        {worker.length === 0 && <div className="text-gray-500  font-semibold text-7xl w-full p-12 text-center">No workers available.</div>}
        <div className="flex flex-col items-center justify-center p-4">
          {/* Workers Section */}
          <section className="grid gap-8 mt-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">


            {worker? (worker.map((worker) => (
              <div
                key={worker._id}
                className="bg-white w-full group-active: shadow-md hover:shadow-xl hover:scale-100 transform transition-all duration-200 rounded-2xl border border-gray-200  hover:border-2 overflow-hidden"
              >
                {/* Profile Picture */}
                <Image
                  className="w-full h-32 sm:h-40 md:h-48 object-cover border-b"
                  src={worker.Profile_Pic}
                  height={200}
                  width={300}
                  alt={`${worker.First_Name}`}
                />

                {/* Card Content */}
                <div className="p-3 sm:p-4">
                  <h1 className="font-semibold text-lg sm:text-xl flex items-center gap-2 text-gray-800">
                    <User className="h-5 w-5 text-pink-500" />
                    {worker.First_Name}.{worker.Last_Name.charAt(0)}
                  </h1>

                  {/* Tailwind Button */}
                  <Link href={`/worker/${worker._id}`}>
                  <button
                    className="mt-3 w-full py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg border border-pink-500 text-pink-500 text-sm sm:text-base font-medium hover:bg-pink-500 hover:text-white transition-colors"
                  >
                    View Profile
                  </button>
                  </Link>
                </div>
              </div>
            ))):(
            <>
              <div className="text-pink-500  font-semibold text-7xl w-full p-12 text-center">No workers found.</div>
            </>)}
          </section>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default Page
