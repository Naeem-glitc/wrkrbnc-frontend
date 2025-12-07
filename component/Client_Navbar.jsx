"use client";
import { useRouter } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { handleError } from "@/frontend_utalties/notfication_control";
import axios from "axios";
import Link from "next/link";
import API_BASE_URL from "@/config/api";

const Client_Navbar = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
   
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) return;

        const decoded = jwtDecode(token);
        const id = decoded.id;

        const rsp = await axios.get(`${API_BASE_URL}/getClientDetails/${id}`);

        if (rsp.data.success) {
          setUser(rsp.data.data);
        }
      } catch (error) {
        handleError("Something went wrong while loading profile");
      }
    };

    fetchUser();
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/hireworker/${user._id}?query=${encodeURIComponent(search)}`);
    setIsMobileMenuOpen(false);
  };

  const handleClick = (profession) => {
    router.push(`/hireworker/${user._id}?query=${encodeURIComponent(profession)}`);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <nav className="w-full shadow-md ">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-blue-50 sm:px-6">
        {/* Logo */}
        <div className="text-xl font-bold text-black sm:text-2xl">WrkrBnC.</div>

        {/* Search Bar - Hidden on mobile, visible on medium screens and up */}
        <form 
          className="hidden md:flex items-center w-full max-w-md mx-4" 
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for services..."
            className="w-full border border-gray-300 rounded-l-full py-2 px-4 focus:outline-none focus:border-amber-500 text-sm sm:text-base"
          />
          <button 
            type="submit" 
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 rounded-r-full py-3"
          >
            <Search className="w-5 h-4.5" />
          </button>
        </form>

        {/* Mobile Search Button */}
        <button 
          className="md:hidden relative  bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full ml-auto"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Profile Section - Hidden on small screens, visible on medium and up */}
       <Link href={`/users/${user._id}`} ><div className="hidden md:flex items-center gap-3">
          <Image
            src="/user.png"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full border border-emerald-500"
          />
          <span className="font-medium text-gray-700">{user.Name}</span>
        </div></Link>
      </div>

      {/* Mobile Search Bar - Only visible when menu is open */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-50 px-4 py-3 border-t">
          <form className="flex items-center w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for services..."
              className="w-full border border-gray-300 rounded-l-full py-2 px-4 focus:outline-none focus:border-amber-500 text-sm"
            />
            <button 
              type="submit" 
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 rounded-r-full py-2"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* Sub Navbar */}
      <div className="bg-emerald-600 text-white px-4 py-2 hidden md:flex flex-wrap items-center justify-center gap-4 lg:gap-6 text-sm font-medium">
        {[
          "AC Repairing",
          "Plumbing",
          "Labour",
          "Gardener",
          "Electrician",
          "Cleaner",
          "Carpenter",
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(item)}
            className="hover:text-blue-200 cursor-pointer transition-colors whitespace-nowrap"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Mobile Sub Navbar - Only visible when menu is open */}
      {isMobileMenuOpen && (
        <div className="bg-emerald-600 text-white px-4 py-3 md:hidden">
          <div className="grid grid-cols-2 gap-2">
            {[
              "AC Repairing",
              "Plumbing",
              "Labour",
              "Gardener",
              "Electrician",
              "Cleaner",
              "Carpenter",
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleClick(item)}
                className="hover:text-blue-200 cursor-pointer transition-colors text-sm py-2 text-center bg-emerald-700 rounded-lg hover:bg-emerald-800"
              >
                {item}
              </button>
            ))}
          </div>
          
          {/* Mobile Profile Section */}
         <Link href={`/users/${user._id}`} ><div className="flex items-center cursor-pointer gap-3 mt-4 pt-4 border-t border-emerald-500">
            <Image
              src="/upscaled_4k.png"
              alt="Profile"
              width={36}
              height={36}
              className="rounded-full border border-emerald-400"
            />
            <span className="font-medium text-white">{user.Name}</span>
          </div></Link> 
        </div>
      )}
    </nav>
  );
};

export default Client_Navbar;