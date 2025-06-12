import { Link } from "@tanstack/react-router";

import { FiHome, FiPieChart, FiInfo } from "react-icons/fi";

const BottomNavbar = () => {
  return (
    <menu>
      <div className="flex justify-around py-1">
        <Link
          to="/"
          className="flex flex-col items-center px-3 py-1 text-xs font-medium"
          activeProps={{ className: "text-blue-600" }}
        >
          <FiHome className="h-5 w-5 mb-1" />
          <span>Home</span>
        </Link>

        <Link
          to="/dashboard"
          className="flex flex-col items-center px-3 py-1 text-xs font-medium"
          activeProps={{ className: "text-blue-600" }}
        >
          <FiPieChart className="h-5 w-5 mb-1" />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/about"
          className="flex flex-col items-center px-3 py-1 text-xs font-medium"
          activeProps={{ className: "text-blue-600" }}
        >
          <FiInfo className="h-5 w-5 mb-1" />
          <span>About</span>
        </Link>
      </div>
    </menu>
  );
};

export default BottomNavbar;
