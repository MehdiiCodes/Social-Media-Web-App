'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <header className={`bg-gradient-to-r from-gray-900 via-gray-800 to-black text-gray-100 shadow-lg sticky top-0 z-50 transition-all duration-300 ease-in-out ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="./feed" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 transition-colors duration-200 transform hover:scale-105">
              MehdiiCodes
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="./feed">Home</NavLink>
            <NavLink href="./addpost">Add Post</NavLink>
            <NavLink href="/managecommunity">Manage Community</NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-200 transform hover:scale-110 relative overflow-hidden group"
              aria-label="Notifications"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:text-purple-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-purple-500 animate-ping"></span>
              <span className="absolute inset-0 rounded-full bg-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></span>
            </button>

            <div className="hidden md:block">
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold transition-all duration-200 hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 relative overflow-hidden group"
              >
                <span className="relative z-10">Log out</span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></span>
              </button>
            </div>

            <button 
              onClick={toggleMenu} 
              className="md:hidden p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-200 transform hover:scale-110 group"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:text-purple-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 space-y-4 animate-fadeIn">
            <NavLink href="./feed" mobile>Home</NavLink>
            <NavLink href="./addpost" mobile>Add Post</NavLink>
            <NavLink href="/managecommunity" mobile>Manage Community</NavLink>
            <div className="mt-4">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-center rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold transition-all duration-200 hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 relative overflow-hidden group"
              >
                <span className="relative z-10">Log out</span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const NavLink = ({ href, children, mobile }) => (
  <Link 
    href={href} 
    className={`font-medium text-gray-300 hover:text-white transition-colors duration-200 relative group ${
      mobile ? 'block py-2 hover:bg-gray-700 rounded-lg px-3' : ''
    }`}
  >
    {children}
    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-200 group-hover:w-full"></span>
  </Link>
);

export default Header;

