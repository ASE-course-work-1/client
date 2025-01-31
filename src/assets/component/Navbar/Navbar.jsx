import React from 'react'

export default function Navbar() {
  return (
    <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[1200px] p-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg z-50 rounded-full">
    <div className="flex justify-center space-x-8">
      <button className="px-6 py-2 bg-gray-700 rounded-full transition duration-300 hover:bg-indigo-400 hover:scale-105 focus:outline-none">
        Contact
      </button>
      <button className="px-6 py-2 bg-gray-700 rounded-full transition duration-300 hover:bg-indigo-400 hover:scale-105 focus:outline-none">
        Price
      </button>
      <button className="px-6 py-2 bg-gray-700 rounded-full transition duration-300 hover:bg-indigo-400 hover:scale-105 focus:outline-none">
        Outlet
      </button>
      <button className="px-6 py-2 bg-gray-700 rounded-full transition duration-300 hover:bg-indigo-400 hover:scale-105 focus:outline-none">
        Login
      </button>
    </div>
  </nav>

  )
}
