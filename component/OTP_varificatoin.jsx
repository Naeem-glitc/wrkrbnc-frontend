"use client"
import axios from 'axios'
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useState } from 'react'
import { handleError, handleSuccess } from '../frontend_utalties/notfication_control';
import { useRouter } from 'next/navigation';
import API_BASE_URL from '@/config/api';

const OTP_varificatoin = ({ email, role }) => {
  const [OTP, setOTP] = useState("")
  const router = useRouter();
  const handleChange = (e) => {
    setOTP(e.target.value);
  };

  const handlevarify = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.post(`${API_BASE_URL}/create-${role}/varify-OTP`, { Email: email, otp: OTP });
      if (res.data.success) {
        handleSuccess(res.data.message);
        setOTP("");
        router.push('/login');
      }


    } catch (error) {
      if (!OTP) {
        handleError("Please enter the OTP.");
      } else {
        handleError(error.response?.data?.message || "An error occurred. Please try again.");
        console.error('Error during OTP verification:', error.response?.data || error.message);
      }


    }
  }



  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-amber-400 to-blue-600 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
            {/* Heading */}
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-12 w-12 text-amber-500 mb-3" />
              <h2 className="text-3xl font-bold text-amber-500 text-center">
                Verify OTP
              </h2>
              <p className="text-gray-600 mt-2 text-center">
                Please enter the OTP sent to your email.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handlevarify} className="mt-6 space-y-5">
              <input
                value={OTP}
                onChange={handleChange}
                type="text"
                maxLength={6}
                placeholder="Enter OTP"
                className="w-full border border-gray-300 rounded-xl py-3 px-4 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 font-semibold text-white py-3 rounded-xl text-lg hover:bg-blue-700 transition-all"
              >
                Verify OTP
              </button>
            </form>

            {/* Resend Option */}
            <p className="text-center mt-6 text-sm text-gray-600">
              Didn’t receive the code?{" "}
              <a
                href="#"
                className="text-blue-600 font-medium hover:underline hover:text-blue-800"
              >
                Resend OTP
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default OTP_varificatoin
