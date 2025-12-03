"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff  } from "lucide-react";
import axios from "axios";
import { handleError, handleSuccess } from "@/frontend_utalties/notfication_control";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";


export default function LoginPage() {
  const router = useRouter();
  const [Login, setLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ Email: "", Password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await axios.post("http://localhost:3001/userLogin", form, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      if (user.data.success) {
        handleSuccess("Login Successfully");
        Cookies.set("token", user.data.token);
        const role = user.data.role;
        const userId = user.data.id;
        if (role === 'client') {
          router.push(`/hireworker/${userId}`);
        } else if (role === 'worker') {
          router.push(`/user/${userId}`)
        }
      };

    } catch (error) {
      if (!form.Email || !form.Password) {
        handleError("Please fill in all fields.");
        return;
      } else {
        console.error('Login error:', error);
        handleError(error.response?.data?.message || "An error occurred during login. Please try again.");
      }

    }
  };




  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 via-amber-400 to-blue-600 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl shadow-2xl backdrop-blur-lg bg-white/90 p-8">
          <h2 className="text-3xl font-bold text-center text-emerald-600 mb-3">
            Welcome Back
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Login to continue to your account
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="Email"
                placeholder="Enter your email"
                value={form.Email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl pl-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="Password"
                placeholder="Enter your password"
                value={form.Password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {/* Eye Icon Button */}
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

            {/* Links */}
            <div className="flex justify-between items-center text-sm">
              <Link href="/forgetpassword" className="text-blue-600 hover:underline">
                Forgot Password?
              </Link>
              <Link href="/sign-up" className="text-amber-600 hover:underline">
                Create Account
              </Link>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-3 rounded-xl text-lg font-semibold hover:bg-amber-600 transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
