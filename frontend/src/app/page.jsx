import React from 'react'
import Link from 'next/link'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white mb-2">SocialApp</h1>
          <p className="text-xl text-gray-300">Connect. Share. Discover.</p>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 space-y-6">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          <Link href="/login"
               className="block w-full h-full">Log In
            </Link>
          </button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 opacity-25"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-gray-300">Or</span>
            </div>
          </div>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
            <Link href="/signup"
              className="block w-full h-full">Create New Account
            </Link>
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.</p>
        </div>
      </div>
    </div>
  )
}

export default Home

