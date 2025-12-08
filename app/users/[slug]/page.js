"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  User,
  MapPin,
  Heart,
  Briefcase,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Footer from "@/component/Footer";
import { handleError, handleSuccess } from "@/frontend_utalties/notfication_control";
import WrkrBnCLoader from "@/component/loader";
import Setting from "@/component/Setting";
import Cookies from "js-cookie";
import API_BASE_URL from '@/config/api';

export default function ClientDashboard() {
  const router = useRouter();
  const { slug } = useParams();
  const [section, setSection] = useState("profile");
  const [client, setClient] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/getClientDetails/${slug}`);
        if (res.data.success) {
          setClient(res.data.data);
        }
      } catch (error) {
        handleError("Unable to load client details");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) fetchClient();
  }, [slug]);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      const resp = await axios.get(`${API_BASE_URL}/logout`);
      if (resp.data.success) {
        handleSuccess("Logged out successfully");
        Cookies.remove("token");
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch (error) {
      console.log("Backend logout unavailable, doing client-side cleanup");
    handleSuccess("Logged out successfully");
    Cookies.remove("token");
    localStorage.clear(); // Add this to clear localStorage
    sessionStorage.clear(); // Add this to clear sessionStorage
     Cookies.remove("token");
    setTimeout(() => router.push("/login"), 1500);
    }
  };

  

  if (isLoading) return <WrkrBnCLoader />;

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
        {/* Mobile Top Navbar */}
        <div className="md:hidden bg-gray-900 text-white flex items-center justify-between px-5 py-4">
          <h1 className="text-xl font-semibold">Client Panel</h1>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={26} />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 text-gray-200 px-4 py-3 space-y-2 animate-slideDown">
            <button onClick={() => { setSection("profile"); setIsMenuOpen(false); }} className="flex w-full items-center gap-2 py-2 hover:text-white">
              <User size={18} /> Profile
            </button>
            <button onClick={() => { setSection("bookings"); setIsMenuOpen(false); }} className="flex w-full items-center gap-2 py-2 hover:text-white">
              <Briefcase size={18} /> Bookings
            </button>
            <button onClick={() => { setSection("favorites"); setIsMenuOpen(false); }} className="flex w-full items-center gap-2 py-2 hover:text-white">
              <Heart size={18} /> Favorites
            </button>
            <button onClick={() => { setSection("settings"); setIsMenuOpen(false); }} className="flex w-full items-center gap-2 py-2 hover:text-white">
              <Settings size={18} /> Settings
            </button>
            <button onClick={handleLogout} className="flex w-full items-center gap-2 py-2 text-red-400 hover:text-red-600">
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 bg-gray-900 text-gray-200 flex-col">
          <div className="text-2xl font-bold text-blue-400 p-6">Client Panel</div>

          <nav className="flex-1 px-4 space-y-3">
            <button
              onClick={() => setSection("profile")}
              className={`flex items-center gap-2 px-3 py-2 w-full rounded-lg ${section === "profile" ? "bg-blue-500 text-white" : "hover:bg-gray-700"}`}
            >
              <User size={18} /> Profile
            </button>

            <button
              onClick={() => setSection("bookings")}
              className={`flex items-center gap-2 px-3 py-2 w-full rounded-lg ${section === "bookings" ? "bg-blue-500 text-white" : "hover:bg-gray-700"}`}
            >
              <Briefcase size={18} /> Bookings
            </button>

            <button
              onClick={() => setSection("favorites")}
              className={`flex items-center gap-2 px-3 py-2 w-full rounded-lg ${section === "favorites" ? "bg-blue-500 text-white" : "hover:bg-gray-700"}`}
            >
              <Heart size={18} /> Favorites
            </button>

            <button
              onClick={() => setSection("settings")}
              className={`flex items-center gap-2 px-3 py-2 w-full rounded-lg ${section === "settings" ? "bg-blue-500 text-white" : "hover:bg-gray-700"}`}
            >
              <Settings size={18} /> Settings
            </button>
          </nav>

          <div className="p-4 border-t border-gray-700">
            <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-600 w-full">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {section === "profile" && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                <span className="text-blue-600">My Profile</span>
                <span className="block h-1 w-8 bg-blue-600 rounded-full"></span>
              </h2>

              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-900">{client.Name}</p>
                <p className="text-gray-600 flex items-center gap-1">
                  <MapPin size={16} className="text-blue-500" /> {client.City}
                </p>
                <p className="text-green-600 font-medium flex items-center gap-2">
                  <span className="h-2 w-2 bg-green-500 rounded-full"></span> Verified Client
                </p>
              </div>
            </div>
          )}

          {section === "bookings" && (
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">My Bookings</h2>
              {client.bookings?.length ? (
                <div className="space-y-4">
                  {client.bookings.map((job, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-xl shadow-sm">
                      <p className="font-medium text-gray-900">{job.workerName}</p>
                      <p className="text-gray-600">{job.service}</p>
                      <p className="text-blue-600 font-semibold">Rs. {job.price}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No bookings yet</p>
              )}
            </div>
          )}

          {section === "favorites" && (
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">Favorite Workers</h2>
              {client.favorites?.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {client.favorites.map((worker, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl shadow-md p-4">
                      <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 relative rounded-full overflow-hidden border">
                          <Image
                            src={`${API_BASE_URL}/uploads/${worker.Profile_Pic}`}
                            alt="Worker"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{worker.First_Name}</p>
                          <p className="text-blue-600 text-sm">{worker.Profession}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No favorite workers</p>
              )}
            </div>
          )}

          {section === "settings" && <Setting id={slug} />}
        </main>
      </div>

      <Footer />
    </>
  );
}
