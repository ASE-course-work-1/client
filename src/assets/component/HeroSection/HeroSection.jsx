import React from 'react'
import image1 from '../../images/bg.jpg';

export default function HeroSection() {
  return (
     <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${image1})` }}
      >
        <div className="text-center  bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-white text-8xl font-bold">welcome</h1>
          <button className="mt-4 px-8 py-3 bg-blue-500 text-white rounded-lg transition duration-300 hover:bg-blue-600">
            Join Us
          </button>
        </div>
      </div>
  )
}
