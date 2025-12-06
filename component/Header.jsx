import React from 'react'
import SequentialVideoPlayer from './Vediocontrol'
import Link from 'next/link'

const Header = () => {
    return (
        <>
            <header className="relative flex justify-center items-center w-full h-screen">
                {/* Background Video */}
                <SequentialVideoPlayer />

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-10 z-10">
                    {/* Heading */}
                    <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold mb-4 bg-gradient-to-r from-amber-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent animate-fade-in drop-shadow-md">
                        Find Skilled Workers
                    </h1>

                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-500 animate-fade-in-up delay-300">
                        When You Need Them
                    </h2>

                    {/* Subtext */}
                    <p className="mt-6 sm:mt-8 max-w-xl sm:max-w-2xl text-white sm:text-white font-medium text-base sm:text-lg leading-relaxed animate-fade-in-up delay-500">
                        Connect with verified professionals for all your service needs. From home repair to
                        cleaning, we’ve got you covered with reliable workers you can trust.
                    </p>
                      
                    {/* Buttons */}
                    <div className="mt-10 sm:mt-14 flex flex-col sm:items-center  sm:flex-row gap-4 sm:gap-6">
                        <Link href="/login">
                            <button className="px-8 py-3 rounded-xl font-semibold text-lg hover:bg-amber-600 bg-amber-500 text-white shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
                                Hire Now
                            </button>
                        </Link>

                        <Link href="/sign-up">
                            <button className="px-8 py-3 rounded-xl font-semibold text-lg bg-white/80 text-gray-800 border border-gray-200 shadow-lg hover:bg-amber-500 hover:text-white hover:border-amber-500 hover:scale-105 hover:shadow-2xl transition-all duration-300 backdrop-blur">
                                Join WrkrBnC.
                            </button>
                        </Link>
                    </div>
                </div>

            </header>




        </>
    )
}

export default Header
