'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);
  

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      if (newMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
      return newMode;
    });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-gray-800 dark:to-gray-900 text-white shadow-lg sticky top-0 z-50 transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="./" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="text-2xl font-bold">CommUnity</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="./feed">Home</NavLink>
            <NavLink href="./addpost">Add Post</NavLink>
            <NavLink href="/managecommunity">Manage Community</NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200">
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="hidden md:flex space-x-2">
              <Link href="/login" className="px-4 py-2 rounded-full bg-white text-purple-600 hover:bg-opacity-90 transition-colors duration-200">
                Log in
              </Link>
              <Link href="/signup" className="px-4 py-2 rounded-full bg-purple-800 hover:bg-purple-700 transition-colors duration-200">
                Sign up
              </Link>
            </div>

            <button onClick={toggleMenu} className="md:hidden p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <NavLink href="./feed" mobile>Home</NavLink>
            <NavLink href="./addpost" mobile>Add Post</NavLink>
            <NavLink href="/managecommunity" mobile>Manage Community</NavLink>
            <div className="flex space-x-2 mt-4">
              <Link href="/login" className="flex-1 px-4 py-2 text-center rounded-full bg-white text-purple-600 hover:bg-opacity-90 transition-colors duration-200">
                Log in
              </Link>
              <Link href="/signup" className="flex-1 px-4 py-2 text-center rounded-full bg-purple-800 hover:bg-purple-700 transition-colors duration-200">
                Sign up
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const NavLink = ({ href, children, mobile }) => (
  <Link href={href} className={`font-medium hover:text-purple-200 transition-colors duration-200 ${mobile ? 'block py-2' : ''}`}>
    {children}
  </Link>
);

export default Header;

