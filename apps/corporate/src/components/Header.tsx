'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState('');
  const [flowinsightId, setFlowinsightId] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('flowinsight_token');
      const storedFullName = localStorage.getItem('flowinsight_fullname');
      const storedFlowinsightId = localStorage.getItem('flowinsight_id');
      if (token && storedFullName) {
        setIsLoggedIn(true);
        setFullName(storedFullName);
        setFlowinsightId(storedFlowinsightId || '');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('flowinsight_token');
    localStorage.removeItem('flowinsight_id');
    localStorage.removeItem('flowinsight_fullname');
    document.cookie = 'flowinsight_token=; path=/; max-age=0';
    setIsLoggedIn(false);
    setDropdownOpen(false);
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 sm:py-5">
          
          {/* Logo Section */}
          <Link 
            href="/" 
            className="flex items-center gap-3 hover:opacity-80 transition duration-150"
          >
            {/* Gradient Logo Icon */}
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 30 24" 
              fill="none"
              className="flex-shrink-0"
            >
              <defs>
                <linearGradient id="graphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4285F4" stopOpacity="1" />
                  <stop offset="100%" stopColor="#34A853" stopOpacity="1" />
                </linearGradient>
              </defs>
              <polyline
                points="2,20 8,12 14,16 20,8 26,4"
                stroke="url(#graphGradient)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Logo Text */}
            <span className="text-xl font-medium text-gray-900 tracking-wide hidden sm:inline">
              FLOW INSIGHT
            </span>
          </Link>

          {/* Navigation - Right Side */}
          <div className="flex items-center gap-2 sm:gap-6">
            {isLoggedIn ? (
              // Logged In: Show Full Name and Dropdown
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition duration-150"
                >
                  <span className="hidden sm:inline">{fullName || 'User'}</span>
                  <span className="text-xs">▼</span>
                </button>
                
                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {/* Profile Info Section */}
                    <div className="px-4 sm:px-6 py-4 bg-gray-50 border-b border-gray-200">
                      <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-1">Full Name</p>
                      <p className="text-sm font-bold text-gray-900 mb-3">{fullName || 'User'}</p>
                      <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-1">Account ID</p>
                      <p className="text-xs font-medium text-gray-700 break-all">{flowinsightId || 'N/A'}</p>
                    </div>
                    
                    <Link 
                      href="/dashboard"
                      className="block px-4 sm:px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 sm:px-6 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition border-t border-gray-200"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Not Logged In: Show Sign In and Get Started
              <div className="flex items-center gap-2 sm:gap-4">
                <Link 
                  href="/login"
                  className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition duration-150"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2.5 rounded-lg font-medium text-sm transition duration-150 shadow-sm hover:shadow-md"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}