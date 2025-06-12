import { Outlet } from "@tanstack/react-router";

import TopNavbar from "../components/Navbar/TopNavbar";
import BottomNavbar from "../components/Navbar/BottomNavbar";

const RootLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <nav className="flex-shrink-0 border-b shadow bg-white z-50">
        <TopNavbar />
      </nav>

      {/* Main scrollable content */}
      <main className="flex-1 overflow-y-auto pb-14">
        <Outlet />
      </main>

      {/* Bottom Mobile Navbar */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white z-50">
        <BottomNavbar />
      </div>
    </div>
  );
};

export default RootLayout;
