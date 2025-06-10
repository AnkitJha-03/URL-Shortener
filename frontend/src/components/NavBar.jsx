import { Link, useNavigate } from "@tanstack/react-router";
import useAuthStore from "../stores/auth.store";


const Navbar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);

  const onLogout = () => {
    logout();
    navigate({ to: '/auth' });
  }

  return (
    <nav className="bg-white border border-b-black flex justify-between h-16 px-4 sm:px-6 lg:px-8">
      {/* Left side - App Name */}
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          URL Shortener
        </Link>
      </div>

      {/* Center - Navigation */}
      <div className="flex items-center justify-center gap-10">
        <Link
          to="/"
          className="text-gray-700 hover:text-gray-900 font-medium"
        >
          Home
        </Link>
        <Link
          to="/Dashboard"
          className="text-gray-700 hover:text-gray-900 font-medium"
        >
          Dashboard
        </Link>
        <Link
          to="/About"
          className="text-gray-700 hover:text-gray-900 font-medium"
        >
          About
        </Link>
      </div>
      
      {/* Right side - Auth buttons */}
      <div className="flex items-center">
        {(isLoggedIn) ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user?.name || 'User'}</span>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/auth"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;