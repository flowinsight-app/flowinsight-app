'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [flowinsight_id, setFlowinsight_id] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('flowinsight_token');
    const id = localStorage.getItem('flowinsight_id');
    
    if (token && id) {
      setIsLoggedIn(true);
      setFlowinsight_id(id);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('flowinsight_token');
    localStorage.removeItem('flowinsight_id');
    localStorage.removeItem('flowinsight_remember');
    document.cookie = 'flowinsight_token=; path=/; max-age=0';
    
    router.push('/');
  };

  return (
    <header className="bg-white border-b-2 border-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <svg
            width="24"
            height="24"
            viewBox="0 0 30 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline
              points="2,20 8,12 14,16 20,8 26,4"
              stroke="#22c55e"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-mono font-bold text-lg hidden sm:inline">FLOW INSIGHT</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="font-mono text-sm font-bold flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded transition"
              >
                {flowinsight_id}
                <span className={`transform transition ${showDropdown ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-50">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 font-mono text-sm hover:bg-gray-100 border-b-2 border-gray-300"
                    onClick={() => setShowDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 font-mono text-sm hover:bg-gray-100 text-red-600 font-bold"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="font-mono text-sm font-bold hover:underline"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="font-mono text-sm font-bold bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden font-mono text-2xl font-bold"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t-2 border-gray-300 p-4 space-y-3">
          {isLoggedIn ? (
            <>
              <div className="font-mono text-sm font-bold mb-2">{flowinsight_id}</div>
              <Link
                href="/dashboard"
                className="block font-mono text-sm font-bold hover:bg-gray-100 px-3 py-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left font-mono text-sm font-bold hover:bg-gray-100 text-red-600 px-3 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block font-mono text-sm font-bold hover:bg-gray-100 px-3 py-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block font-mono text-sm font-bold bg-black text-white px-3 py-2 rounded hover:bg-gray-800 transition text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}