"use client"
import { useState } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { User, Mail, MapPin, Home, Lock, Eye, EyeOff } from "lucide-react";
import { handleError, handleSuccess } from '../frontend_utalties/notfication_control.js';
import OTP_varificatoin from './OTP_varificatoin.jsx';

const Client_signUp = ({ onBack }) => {
    const [email, setEmail] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [role, setrole] = useState("")
    const [isSubmiting, setIsSubmiting] = useState(false)
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

    const [formdata, setFormdata] = useState({
        Name: '',
        Email: '',
        City: '',
        Address: '',
        Password: ''
    })

    const handlechange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }

    const handlesubmit = async (e) => {
        e.preventDefault();

        try {
            const form = new FormData();
            Object.keys(formdata).forEach(key => {
                form.append(key, formdata[key]);
            })

            const response = await axios.post('http://localhost:3001/sign-up/client', form, {
                headers: { 'Content-Type': 'application/json' }
            })
            console.log(form)
            if (response.status === 200) {
                setFormdata({
                    Name: '',
                    Email: '',
                    City: '',
                    Address: '',
                    Password: ''
                })
                setEmail(formdata.Email)
                setrole("client")
                setIsSubmiting(true)
                return handleSuccess('SignUp Successful!');

            }


        } catch (error) {
            console.error('error during signup', error)
            return handleError('SignUp Failed! Please try again.');
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
                    className="w-full max-w-lg"
                >
                    <div className="rounded-2xl shadow-2xl backdrop-blur-lg bg-white/90 p-5">
                        <h2 className="text-3xl font-bold text-center text-emerald-600 mb-3">
                            SignUp
                        </h2>
                        <p className="text-center text-gray-600 mb-8">
                            Create an account to hire trusted workers
                        </p>

                        <form onSubmit={handlesubmit} className="space-y-5">
                            {/* Name */}
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    onChange={handlechange}
                                    value={formdata.Name}
                                    required
                                    type="text"
                                    name="Name"
                                    placeholder="Enter Your Name"
                                    className="w-full border border-gray-300 rounded-xl pl-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    onChange={handlechange}
                                    value={formdata.Email}
                                    required
                                    type="email"
                                    name="Email"
                                    placeholder="Enter Your Email"
                                    className="w-full border border-gray-300 rounded-xl pl-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* City */}
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <select
                                    onChange={handlechange}
                                    value={formdata.City}
                                    required
                                    name="City"
                                    className="w-full border border-gray-300 rounded-xl pl-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select your City</option>
                                    {punjabDistricts.map((district, index) => (
                                        <option key={index} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Address */}
                            <div className="relative">
                                <Home className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    onChange={handlechange}
                                    value={formdata.Address}
                                    required
                                    type="text"
                                    name="Address"
                                    placeholder="Enter Your Address"
                                    className="w-full border border-gray-300 rounded-xl pl-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="Password"
                                    placeholder="Enter your password"
                                    value={formdata.Password}
                                    onChange={handlechange}
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

                            {/* Agreement */}
                            <div className="flex items-center gap-2 text-sm">
                                <input required type="checkbox" id="Link-checkbox" />
                                <label htmlFor="Link-checkbox">
                                    I agree to the WrkrBnC{" "}
                                    <a className="text-blue-600 hover:underline" href="/user-agrement">
                                        User Agreement
                                    </a>{" "}
                                    and{" "}
                                    <a className="text-blue-600 hover:underline" href="/privacypolicy">
                                        Privacy Policy
                                    </a>.
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-amber-500 text-white py-3 rounded-xl text-lg font-semibold hover:bg-amber-600 transition-all"
                            >
                                Sign Up
                            </button>
                        </form>

                        {/* Links */}
                        <div className="flex justify-between items-center mt-6 text-sm">
                            <a href="/login" className="text-blue-600 hover:underline">
                                Already have an account? Login
                            </a>
                            <button
                                onClick={onBack}
                                className="text-amber-600 hover:underline"
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

export default Client_signUp
