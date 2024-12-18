'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`);
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        menuOpen
      ) {
        setMenuOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        searchOpen
      ) {
        setSearchOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen, searchOpen]);

  return (
    <header
      className={`bg-gradient-to-r from-cyan-600 via-blue-500 to-purple-600 text-white shadow-lg sticky top-0 z-50 transition-all duration-300 ${
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
          <span className="text-2xl font-bold group-hover:text-blue-200 transition-colors duration-200">
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
          {/* Collapsible Search Bar */}
          <div className="relative" ref={searchRef}>
            <div
              className={`flex items-center transition-all duration-300 ${
                searchOpen ? 'w-64' : 'w-10'
              }`}
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`px-4 py-2 rounded-full bg-white text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ${
                  searchOpen ? 'block' : 'hidden'
                }`}
              />
              <button
                onClick={searchOpen ? handleSearch : toggleSearch}
                className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200"
                aria-label="Toggle Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </div>
          </div>

          {/* Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button onClick={toggleMenu} aria-label="Profile">
              <img
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                className="h-10 w-10 rounded-full hover:ring-2 hover:ring-blue-400 transition-all duration-200"
              />
            </button>
            <div
              className={`absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-lg py-2 transform transition-transform duration-300 ${
                menuOpen
                  ? 'scale-100 opacity-100'
                  : 'scale-95 opacity-0 pointer-events-none'
              }`}
            >
              <div className="flex items-center px-4 py-3 border-b">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User"
                  className="h-8 w-8 rounded-full mr-3"
                />
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500">johndoe@example.com</p>
                </div>
              </div>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ href, children, mobile }) => (
  <Link
    href={href}
    className={`font-medium hover:text-blue-200 transition-colors duration-200 ${
      mobile
        ? 'block py-2 hover:bg-white hover:bg-opacity-10 rounded-lg px-3'
        : ''
    }`}
  >
    {children}
  </Link>
);

export default Header;
