'use client'

import React from 'react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col justify-center items-center p-4 overflow-hidden relative">
      {/* Background elements for "overlooking" effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-grid-white/[0.2] transform -rotate-12"></div>
      </div>

      {/* Main content */}
      <div className="text-center z-10 transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
          404
        </h1>
        <p className="text-3xl font-bold text-gray-300 mt-4 mb-8 animate-bounce">
          Oops! Page Not Found
        </p>
        <Link 
          href="/" 
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-full inline-block transition duration-300 ease-in-out hover:from-purple-600 hover:to-pink-600 hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
        >
          Back to Homepage
        </Link>
      </div>

      {/* Floating elements for depth */}
      <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-purple-500 rounded-full opacity-50 animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-pink-500 rounded-full opacity-50 animate-float animation-delay-2000"></div>
      <div className="absolute top-3/4 left-1/3 w-16 h-16 bg-blue-500 rounded-full opacity-50 animate-float animation-delay-4000"></div>

      {/* Footer message */}
      <div className="absolute bottom-8 left-0 right-0 text-center text-gray-500">
        <p className="text-lg font-semibold">Lost in the digital cosmos? Don't worry, it happens to the best of us.</p>
      </div>
    </div>
  )
}

export default NotFound

