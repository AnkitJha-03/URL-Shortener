import { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

import { FiHome, FiPieChart, FiInfo, FiLogOut, FiLogIn, FiSun, FiMoon, FiChevronDown } from "react-icons/fi";

import useAuthStore from "../../stores/auth.store";

const TopNavbar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState("light"); // Just for UI, not functional yet

  const onLogout = () => {
    logout();
    navigate({ to: "/auth" });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (isProfileOpen && !target.closest(".profile-dropdown-container")) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                URL Shortener
              </span>
            </Link>

            {/* Primary Navigation */}
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent border-b-2 text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
                activeProps={{ className: "text-gray-900" }}
              >
                <FiHome className="mr-1.5 h-4 w-4" />
                Home
              </Link>

              <Link
                to="/dashboard"
                className="border-transparent border-b-2 text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
                activeProps={{ className: "text-gray-900" }}
              >
                <FiPieChart className="mr-1.5 h-4 w-4" />
                Dashboard
              </Link>

              <Link
                to="/about"
                className="border-transparent border-b-2 text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
                activeProps={{ className: "text-gray-900" }}
              >
                <FiInfo className="mr-1.5 h-4 w-4" />
                About
              </Link>
            </div>
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="profile-dropdown-container relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-1">
                  <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-medium">{user?.name?.charAt(0).toUpperCase() || "U"}</span>
                  </div>
                  <FiChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${isProfileOpen && "transform rotate-180"}`}
                  />
                </button>

                {/* Profile dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-700">{user.name || "User"}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
                    </div>
                    <button
                      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {theme === "light" ? (
                        <>
                          <FiMoon className="mr-3 h-4 w-4 text-indigo-500" />
                          <span>Dark Theme</span>
                        </>
                      ) : (
                        <>
                          <FiSun className="mr-3 h-4 w-4 text-yellow-500" />
                          <span>Light Theme</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={onLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
                    >
                      <FiLogOut className="mr-3 h-4 w-4 text-red-500" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center space-x-1.5 px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiLogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
