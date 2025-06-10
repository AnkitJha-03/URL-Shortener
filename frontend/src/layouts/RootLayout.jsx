import { Outlet } from '@tanstack/react-router'
import Navbar from '../components/NavBar'

const RootLayout = () => {

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