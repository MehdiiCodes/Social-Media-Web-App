import React from 'react';

const SearchBar = ({ onSearch }) => (
  <div className="relative flex-grow">
    <input
      type="text"
      placeholder="Search posts"
      onChange={onSearch}
      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
    />
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
);

export default SearchBar;