"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-md w-full space-y-8 text-center">

        {/* 404 Number */}
        <div className="relative">
          <div className="text-9xl font-bold text-gray-800 opacity-10 absolute -top-10 -left-10 animate-pulse">
            404
          </div>
          <div className="text-8xl font-bold text-indigo-600 mb-4 transform hover:scale-110 transition-transform duration-300">
            404
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:shadow-2xl transition-all duration-300">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>

          <p className="text-gray-600 mb-2">
            Oops! The page you`re looking for isn`t available.
          </p>

          <p className="text-gray-500 text-sm mb-8">
            Don`t worry, let`s get you back on track.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 transform hover:-translate-y-1"
            >
              Go Back
            </button>

            <Link
              href="/"
              className="px-6 py-3 text-base font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition duration-200 transform hover:-translate-y-1"
            >
              Home Page
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Need help?{" "}
              <Link
                href="/contact"
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Contact support
              </Link>
            </p>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute bottom-8 left-8 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce"></div>
        <div className="absolute top-8 right-8 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-8 right-8 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce delay-75"></div>
      </div>
    </div>
  );
}
