"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Plus, Trash2, User, MapPin, Briefcase, ImageIcon, Settings, LogOut, Menu, X } from "lucide-react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Footer from "@/component/Footer";
import { handleError, handleSuccess } from "@/frontend_utalties/notfication_control";
import Setting from "@/component/Setting";
import Services from "@/component/Services";
import DashboardSkeleton from "@/component/loader";
import Cookies from "js-cookie";
import WrkrBnCLoader from "@/component/loader";

export default function WorkerDashboard() {
  const router = useRouter();
  const { slug } = useParams();
  const [section, setSection] = useState("profile");
  const [newService, setNewService] = useState({ title: "", price: "" });
  const [isuser, setIsuser] = useState(false)
  const [worker, setWorker] = useState({});
  const [newPortfolio, setNewPortfolio] = useState({ title: "", image: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  //  load user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const UserInfo = await axios.get(`http://localhost:3001/getUserDetails/${slug}`)
        if (UserInfo.data.success) {
          setWorker(UserInfo.data.data)
          setIsuser(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("error", error)
      }
    }

    if (slug) fetchData();
  }, [slug])

  // Close mobile menu when section changes
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [section]);

  //  add service function
  const addService = async (e) => {
    e.preventDefault();
    if (!newService.title || !newService.price) {
      alert("Please provide both title and price");
      return;
    }
    try {
      const resp = await axios.post(`http://localhost:3001/addService/${slug}`, newService);
      if (resp.data.success) {
        setWorker(resp.data.data);
        setNewService({ title: "", price: "" });
      }
    } catch (error) {
      console.error("Error adding service:", error);
    }
  }

  // add portfolio function
  const addportfolio = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", newPortfolio.title);
    data.append("image", newPortfolio.image);

    if (!newPortfolio.title || !newPortfolio.image) {
      return handleError("Both title and Image are required")
    }

    try {
      const resp = await axios.post(`http://localhost:3001/addportfolio/${slug}`, data)
      if (resp.data.success) {
        setWorker(resp.data.data);
        setNewPortfolio({ title: "", image: "" })
      }

      if (!resp.data.success) {
        return handleError(resp.data.message)
      }
    } catch (error) {
      console.error("Error adding portfolio item:", error);
      handleError("Server error please try again")
    }
  };

  // delete service function
  const deleteService = async (index) => {
    const confirm = window.confirm("Are you sure you want to delete this service?");
    if (!confirm) return;
    try {
      const resp = await axios.delete(`http://localhost:3001/deleteService/${slug}/${worker.services[index]._id}`);
      if (resp.data.success) {
        setWorker({ ...worker, services: resp.data.data })
        handleSuccess(resp.data.message)
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      handleError("Server error please try again")
    }
  }

  // delete portfolio function
  const deletePortfolio = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this portfolio?");
    if (!confirm) return;
    try {
      const resp = await axios.delete(`http://localhost:3001/deletePortfolio/${slug}/${id}`);
      if (resp.data.success) {
        setWorker({ ...worker, portfolio: resp.data.data })
        handleSuccess(resp.data.message)
      }
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      handleError("Server error please try again")
    }
  }

  const logout = async () => {
    try {
      const resp = await axios.get("http://localhost:3001/logout", {
        withCredentials: true
      });
      if (resp.data.success) {
        handleSuccess("logged out successfully")
        Cookies.remove("token");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Logout error:", error);
      handleError("Server error please try again")
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "portfolio", label: "Portfolio", icon: ImageIcon },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (isLoading || !isuser) {
    return <WrkrBnCLoader />
  }

  return (
    <>
      {isuser ? (
        <>
          <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 hover:bg-gray-800 rounded-lg"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="text-xl font-bold text-emerald-400">Worker Panel</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400">
                  <Image
                    src={worker.Profile_Pic || "/default-avatar.png"}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
              <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={toggleMobileMenu} />
            )}

            {/* Mobile Sidebar */}
            <aside className={`
              ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
              md:translate-x-0 transition-transform duration-300 ease-in-out
              fixed md:relative inset-y-0 left-0 z-40
              w-64 bg-gray-900 text-gray-200 shadow-xl flex flex-col
              md:flex
            `}>
              <div className="hidden md:block text-2xl font-bold text-emerald-400 p-6">
                Worker Panel
              </div>
              <nav className="flex-1 px-4 space-y-3 py-6 md:py-0">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSection(item.id)}
                    className={`
                      flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium transition
                      ${section === item.id
                        ? "bg-emerald-500 text-white"
                        : "hover:bg-gray-700 hover:text-white"
                      }
                    `}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
              <div className="p-4 border-t border-gray-700 mt-auto">
                <button
                  onClick={logout}
                  className="flex items-center gap-3 w-full text-red-400 hover:text-red-600 transition px-4 py-3 rounded-lg hover:bg-gray-800"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-6 space-y-6">
              {/* Profile Section */}
              {section === "profile" && (
                <div className="bg-white shadow-xl rounded-2xl p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-emerald-600 mb-4">Profile</h2>
                  <div className="flex flex-col items-center md:items-start md:flex-row gap-6">
                    <div className="relative w-32 h-32 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-emerald-300 shadow-md">
                      <Image
                        src={worker.Profile_Pic || "/default-avatar.png"}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <p className="text-lg font-semibold text-gray-900">{worker.First_Name}.{worker.Last_Name?.charAt(0) || ''}</p>
                      <p className="text-emerald-600">{worker.Profession}</p>
                      <p className="text-gray-600 flex items-center justify-center md:justify-start gap-1">
                        <MapPin size={16} />
                        {worker.City}
                      </p>
                      <p className="text-amber-500 font-medium mt-2">Available</p>
                      <p className="text-gray-700 mt-2">{worker.Description || "No description provided"}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Services Section */}
              {section === "services" && (
                <div className="bg-white shadow-xl rounded-2xl p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-emerald-600 mb-4">Manage Services</h2>
                  <form onSubmit={addService} className="flex flex-col sm:flex-row gap-3 mt-4">
                    <input
                      type="text"
                      placeholder="Service Title"
                      value={newService.title}
                      onChange={(e) =>
                        setNewService({ ...newService, title: e.target.value })
                      }
                      className="border rounded-lg px-4 py-3 flex-1 w-full sm:w-auto"
                    />
                    <input
                      type="text"
                      placeholder="Price"
                      value={newService.price}
                      onChange={(e) =>
                        setNewService({ ...newService, price: e.target.value })
                      }
                      className="border rounded-lg px-4 py-3 w-full sm:w-32"
                    />
                    <button
                      type="submit"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2"
                    >
                      <Plus size={18} />
                      <span>Add</span>
                    </button>
                  </form>
                  <div className="mt-6 space-y-3">
                    {worker?.services?.length > 0 ? (
                      worker.services.map((service, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg shadow-sm"
                        >
                          <span className="text-sm md:text-base">
                            {service.title} -{" "}
                            <span className="text-emerald-600 font-semibold">
                              Rs.{service.price}
                            </span>
                          </span>
                          <button
                            onClick={() => deleteService(idx)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p className="text-lg">No services available</p>
                        <p className="text-sm mt-2">Add your first service above</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Portfolio Section */}
              {section === "portfolio" && (
                <div className="bg-white shadow-xl rounded-2xl p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-emerald-600 mb-4">Manage Portfolio</h2>
                  <form
                    onSubmit={addportfolio}
                    className="flex flex-col md:flex-row gap-3 mt-4"
                  >
                    {/* Title Input */}
                    <input
                      required={true}
                      type="text"
                      placeholder="Job Title"
                      value={newPortfolio.title}
                      onChange={(e) =>
                        setNewPortfolio({ ...newPortfolio, title: e.target.value })
                      }
                      className="
      border rounded-lg w-full 
      px-4 py-3 
      text-base
      h-12 
      md:h-14
      md:flex-1
    "
                    />

                    {/* File Upload */}
                    <input
                      required
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(e) =>
                        setNewPortfolio({ ...newPortfolio, image: e.target.files[0] })
                      }
                      className="
      border rounded-lg w-full
      px-4 py-2
      text-base
      h-12 
      md:h-14
      md:flex-1
      file:mr-4 file:py-2 file:px-4 
      file:rounded-full file:border-0 
      file:text-sm file:font-semibold 
      file:bg-emerald-50 file:text-emerald-700 
      hover:file:bg-emerald-100
    "
                    />

                    {/* Add Button */}
                    <button
                      type="submit"
                      className="
      bg-emerald-500 hover:bg-emerald-600 
      text-white rounded-lg 
      px-6 py-3 
      h-12 md:h-14
      flex items-center justify-center gap-2
    "
                    >
                      <Plus size={18} />
                      <span>Add</span>
                    </button>
                  </form>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
                    {worker?.portfolio && worker.portfolio.length > 0 ? (
                      worker.portfolio.map((job, index) => (
                        <div
                          key={index}
                          className="rounded-xl overflow-hidden shadow-md bg-white relative group hover:shadow-lg transition-shadow duration-300"
                        >
                          <div className="relative w-full h-48">
                            <Image
                              src={job.image || "/placeholder-image.jpg"}
                              alt={job.title || "Portfolio item"}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-800 truncate">{job.title}</h3>
                            <button
                              onClick={() => deletePortfolio(job._id)}
                              className="absolute top-3 right-3 bg-red-100 text-red-600 rounded-full p-2 hover:bg-red-200 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <div className="text-gray-400 mb-4">
                          <ImageIcon size={48} className="mx-auto" />
                        </div>
                        <p className="text-gray-600 text-lg">No portfolio added yet</p>
                        <p className="text-gray-500 text-sm mt-2">Add your work samples above</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Settings Section */}
              {section === "settings" && (
                <div className="bg-white shadow-xl rounded-2xl p-4 md:p-6">
                  <Setting id={slug} />
                </div>
              )}
            </main>
          </div>
          <Footer />
        </>
      ) : (
        <DashboardSkeleton />
      )}
    </>
  );
}