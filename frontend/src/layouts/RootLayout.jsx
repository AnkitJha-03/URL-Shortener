import { useEffect } from 'react';
import { Outlet } from '@tanstack/react-router'

import useAuthStore from '../stores/auth.store';
import { refresh_user } from '../api/user.api'
import Navbar from '../components/NavBar'

const RootLayout = () => {
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);

  const fetchUser = async () => {
    try {
      const user = await refresh_user(); 
      await login(user);
    } catch (err) {
      logout();
    }
  }

  if(!useAuthStore.getState().isLoggedIn) fetchUser();

  return (
  <div className="flex flex-col h-screen">
    {/* Navbar */}
    <nav className="flex-shrink-0 border-b shadow bg-white z-50">
      <Navbar />
    </nav>

    {/* Main scrollable content */}
    <main className="flex-1 overflow-y-auto">
      <Outlet />
    </main>
  </div>
  )
}

export default RootLayout