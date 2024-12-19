'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-2xl' : 'shadow-md'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="./feed" className="flex items-center space-x-2 group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 transform group-hover:scale-110 transition-transform duration-200"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-2xl font-bold group-hover:text-purple-200 transition-colors duration-200">
            MehdiiCodes
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink href="./feed">Home</NavLink>
          <NavLink href="./addpost">Add Post</NavLink>
          <NavLink href="/managecommunity">Manage Community</NavLink>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-full bg-white text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 w-64"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-1/2 transform -translate-y-1/2 right-3 h-5 w-5 text-purple-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zm2 10a6 6 0 111-11.996A6 6 0 0110 14zm6.6-9.4a8 8 0 11-11.2 0 8 8 0 0111.2 0zm-2.4 4.2a1 1 0 00-1.4 0L10 13.4l-2.8-2.8a1 1 0 00-1.4 1.4l3.5 3.5a1 1 0 001.4 0l5-5a1 1 0 000-1.4z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Notifications */}
          <button
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-200 transform hover:scale-110 relative"
            aria-label="Notifications"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
          </button>

          {/* User Avatar */}
          <div className="relative">
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="h-10 w-10 rounded-full cursor-pointer hover:ring-2 hover:ring-purple-400 transition-all duration-200"
              onClick={toggleMenu}
            />
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-purple-600 rounded-lg shadow-lg py-2">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-purple-100 rounded-lg"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 hover:bg-purple-100 rounded-lg"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-purple-100 rounded-lg"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ href, children, mobile }) => (
  <Link
    href={href}
    className={`font-medium hover:text-purple-200 transition-colors duration-200 ${
      mobile
        ? 'block py-2 hover:bg-white hover:bg-opacity-10 rounded-lg px-3'
        : ''
    }`}
  >
    {children}
  </Link>
);

export default Header;