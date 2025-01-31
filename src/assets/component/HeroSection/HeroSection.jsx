import React from 'react'
import image1 from '../../images/bg.jpg';

export default function HeroSection() {
  return (
    <div
  className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
  style={{ backgroundImage: `url(${image1})` }}
>
  {/* Dark Overlay for better readability */}
  {/* <div className="absolute inset-0 bg-black bg-opacity-90"></div> */}

  {/* Glassmorphism Card */}
  <div className="relative text-center backdrop-blur-lg bg-white/10 p-10 rounded-2xl shadow-lg border border-white/20">
    <h1 className="text-white text-6xl md:text-7xl font-extrabold tracking-wide">
      Welcome to <span className="text-blue-950">Gas By Gas</span>
    </h1>
    <p className="text-gray-300 text-lg mt-4">
      Your trusted partner in delivering clean and efficient energy.
    </p>
    <button className="mt-6 px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg transition duration-300 hover:bg-blue-600 hover:scale-105 shadow-lg">
      Join Us
    </button>
  </div>
</div>

  )
}
