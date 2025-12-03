'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

    const pathname = usePathname();
  
  
    

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-20 p-2 flex justify-between items-center w-full">
      {/* Logo */}
      <div className="cursor-pointer">
        <Link href="/">
          <Image
            src="/img.jpg"
            width={160}
            height={50}
            alt="WrkrBnC"
            className="h-auto w-auto"
          />
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 items-center pr-2">
        <Link
          href="/#services"
          className="text-gray-500 hover:text-black font-semibold transition-colors"
        >
          Services
        </Link>
        <Link
          href="/#howitworks"
          className="text-gray-500 hover:text-black font-semibold transition-colors"
        >
          How It Works
        </Link>
        <button className="border-0 text-white rounded-md px-4 py-2 font-semibold bg-blue-600 hover:bg-blue-800 transition-colors">
         <a href="/login">Login</a> 
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-6 md:hidden">
          <Link
            href="/#services"
            className="text-gray-600 hover:text-black font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/#howitworks"
            className="text-gray-600 hover:text-black font-semibold"
            onClick={() => setIsOpen(false)}
          >
            How It Works
          </Link>
          <button className="border-0 text-white rounded-md px-4 py-2 font-semibold bg-blue-600 hover:bg-blue-800 transition-colors">
            Login
          </button>
        </div>
      )}
    </nav>
    </>
  )
}

export default Navbar
