import { Outlet } from "@tanstack/react-router";

import TopNavbar from "../components/Navbar/TopNavbar";
import BottomNavbar from "../components/Navbar/BottomNavbar";

const RootLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="flex-shrink-0 border-b shadow bg-white z-50">
        <TopNavbar />
      </nav>

      {/* Main scrollable content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Mobile Navbar */}
      <div className="sm:hidden">
        <BottomNavbar />
      </div>
    </div>
  );
};

export default RootLayout;
