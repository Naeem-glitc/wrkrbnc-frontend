"use client"
import Client_signUp from "/component/Client_signUp";
import Worker_signUp from "/component/Worker_signUp";
import { motion } from "framer-motion";
import { Briefcase, User } from "lucide-react";
import { useState } from "react";




const Signup = () => {
  const [selectedRole, setSelectedRole] = useState(null)



  const handlerole = async (role) => {

    setSelectedRole(role);
  }

  if (selectedRole === 'worker') {
    return <Worker_signUp onBack={() => setSelectedRole("")} />
  }

  if (selectedRole === 'client') {
    return <Client_signUp onBack={() => setSelectedRole("")} />
  }



  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 via-amber-400 to-blue-600 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="rounded-2xl shadow-2xl backdrop-blur-lg bg-white/90 p-8 text-center">
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-amber-500">
              Join as a
            </h2>
            <p className="text-emerald-600 font-medium sm:font-semibold mb-8">
              Choose your role to continue
            </p>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Worker Option */}
              <button
                onClick={() => handlerole("worker")}
                className="group border-2 border-gray-200 rounded-xl p-6 sm:p-8 bg-white hover:border-blue-500 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center"
              >
                <Briefcase className="h-10 w-10 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  Worker
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Find your next job
                </p>
              </button>

              {/* Client Option */}
              <button
                onClick={() => handlerole("client")}
                className="group border-2 border-gray-200 rounded-xl p-6 sm:p-8 bg-white hover:border-amber-500 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center"
              >
                <User className="h-10 w-10 text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  Client
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Hire professional workers
                </p>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

    </>
  )
}

export default Signup

