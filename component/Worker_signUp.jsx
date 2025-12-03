'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { motion } from "framer-motion";
import { User, Mail, Lock, MapPin, Briefcase, Eye, EyeOff } from "lucide-react";
import OTP_varificatoin from './OTP_varificatoin'


const Worker_signUp = ({ onBack }) => {
  const [files, setFiles] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [email, setEmail] = useState("")
  const [role, setrole] = useState("")
  const [formdata, setFormdata] = useState({

    First_Name: '',
    Last_Name: '',
    Email: '',
    City: '',
    Address: '',
    Profession: '',
    Password: ''

  });


  // List of districts in Punjab

  const punjabDistricts = [
    "Attock",
    "Bahawalnagar",
    "Bahawalpur",
    "Bhakkar",
    "Chakwal",
    "Chiniot",
    "Dera Ghazi Khan",
    "Faisalabad",
    "Gujranwala",
    "Gujrat",
    "Hafizabad",
    "Jhang",
    "Jhelum",
    "Kasur",
    "Khanewal",
    "Khushab",
    "Kot Addu",
    "Lahore",
    "Layyah",
    "Lodhran",
    "Mandi Bahauddin",
    "Mianwali",
    "Multan",
    "Murree",
    "Muzaffargarh",
    "Narowal",
    "Nankana Sahib",
    "Okara",
    "Pakpattan",
    "Rahim Yar Khan",
    "Rajanpur",
    "Rawalpindi",
    "Sahiwal",
    "Sargodha",
    "Sheikhupura",
    "Sialkot",
    "Toba Tek Singh",
    "Vehari",
    "Wazirabad",
    "Talagang",
    "Taunsa"
  ];
  // List of professions
  const profession = [
    "AC Repairing",
    "Plumbing",
    "Labour",
    "Gardenar",
    "Electrician",
    "Cleaner",
    "Carpenter"

  ]


  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  };

  const handlesubmit = async (e) => {
    setIsSubmiting(true);
    e.preventDefault();
    try {

      const form = new FormData();

      Object.keys(formdata).forEach(key => {
        form.append(key, formdata[key]);
      });

      if (files) {
        form.append('profile_photo', files);
      }

      const response = await axios.post('http://localhost:3001/sign-up/worker', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      console.log('Form data submitted:', formdata)
      if (response.data.success) {
        alert('Signup successful');
        setFormdata({
          First_Name: '',
          Last_Name: '',
          Email: '',
          City: '',
          Address: '',
          Profession: '',
          Password: ''


        });
        setFiles(null)
        setEmail(formdata.Email);
        setrole("worker");


      }

      setIsSubmiting(true);

    }
    catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed. Please try again.');
    }





  }

  if (isSubmiting) {
    return <OTP_varificatoin email={email} role={role} />
  }
  return (
    <>

      <div className="flex justify-center p-10 items-center min-h-screen bg-gradient-to-br from-blue-500 via-amber-400 to-blue-600 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <div className="rounded-2xl shadow-2xl backdrop-blur-lg bg-white/90 p-4">
          {/* Heading */}
          <h1 className="text-emerald-600 font-bold text-center text-3xl sm:text-4xl mb-6">
            SignUp As Professional
          </h1>

          {/* Form */}
          <form onSubmit={handlesubmit} className="space-y-5">
            {/* First & Last Name */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-full">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  required
                  value={formdata.First_Name}
                  type="text"
                  onChange={handleChange}
                  name="First_Name"
                  placeholder="First Name"
                  className="w-full border border-gray-300 rounded-xl pl-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative w-full">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  required
                  value={formdata.Last_Name}
                  type="text"
                  onChange={handleChange}
                  name="Last_Name"
                  placeholder="Last Name"
                  className="w-full border border-gray-300 rounded-xl pl-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                required
                value={formdata.Email}
                type="email"
                onChange={handleChange}
                name="Email"
                placeholder="Enter Your Email"
                className="w-full border border-gray-300 rounded-xl pl-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* City */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                required
                onChange={handleChange}
                value={formdata.City}
                name="City"
                className="w-full border border-gray-300 rounded-xl pl-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option className="text-gray-400" value="">
                  Select your City
                </option>
                {punjabDistricts.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                required
                value={formdata.Address}
                type="text"
                onChange={handleChange}
                name="Address"
                placeholder="Enter Your Address"
                className="w-full border border-gray-300 rounded-xl pl-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Profession */}
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                required
                onChange={handleChange}
                value={formdata.Profession}
                name="Profession"
                className="w-full border border-gray-300 rounded-xl pl-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option className="text-gray-400" value="">
                  Select your Profession
                </option>
                {profession.map((prof, index) => (
                  <option key={index} value={prof}>
                    {prof}
                  </option>
                ))}
              </select>
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
               <input
                                    type={showPassword ? "text" : "password"}
                                    name="Password"
                                    placeholder="Enter your password"
                                    value={formdata.Password}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-500"
                                >
                                    {showPassword ? (
                                        <Eye className="h-5 w-5" />
                                    ) : (
                                        <EyeOff className="h-5 w-5" />
                                    )}
                                </button>
            </div>

            {/* Profile Picture */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <input
                onChange={(e) => setFiles(e.target.files[0])}
                className="border border-gray-300 rounded-xl p-2 cursor-pointer w-full sm:w-fit"
                type="file"
                name="profile_photo"
              />
              <Image
                className="rounded-full object-cover w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]"
                src={files ? URL.createObjectURL(files) : "/user.png"}
                alt="Profile"
                width={100}
                height={100}
              />
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-start gap-2">
              <input required type="checkbox" id="Link-checkbox" />
              <label htmlFor="Link-checkbox" className="text-sm">
                I agree to the WrkrBnC{" "}
                <a
                  className="text-blue-600 hover:underline hover:text-blue-800"
                  href="/user-agrement"
                >
                  User Agreement
                </a>{" "}
                and{" "}
                <a
                  className="text-blue-600 hover:underline hover:text-blue-800"
                  href="/privacypolicy"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmiting}
              className="w-full bg-amber-500 text-white py-3 rounded-xl text-lg font-semibold hover:bg-amber-600 transition-all"
            >
              Sign Up
            </button>
          </form>

          {/* Already have account */}
          <p className="text-center mt-6 text-sm sm:text-base">
            Already have an account?{" "}
            <a
              className="text-blue-600 hover:underline hover:text-blue-800"
              href="/login"
            >
              Login
            </a>
          </p>

          {/* Back Button */}
          <div className="flex justify-center sm:justify-end mt-6">
            <button
              onClick={onBack}
              className=" font-semibold text-amber-500 py-2 px-5 rounded-xl hover:underline cursor-pointer transition-all"
            >
              ← Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>









    </>
  )
}

export default Worker_signUp
