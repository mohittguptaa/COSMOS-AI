import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar px-4 py-2 shadow-lg backdrop-blur-lg rounded-lg relative z-40">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <a href="/" className="mask mask-squircle w-12 sm:w-16">
          <img src="/logo.png" alt="Cosmos-AI Logo" />
        </a>
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold btn btn-ghost hover:bg-transparent"
        >
          <span>cosmos</span><span className="text-primary">ai</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex flex-1 justify-end">
        <ul className="menu menu-horizontal px-1 flex items-center space-x-4">
          <li>
            <Link to="/" className="hover:text-blue-500">Home</Link>
          </li>
          <li>
            <Link to="/satellitelist" className="hover:text-blue-500">Satellite List</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-500">About</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <div ref={dropdownRef} className="lg:hidden z-50 flex flex-1 justify-end relative">
        <button onClick={toggleDropdown} className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <ul
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50 absolute top-10"
          >
            <li>
              <a href="#search">Search</a>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/satellitelist">Satellite List</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;