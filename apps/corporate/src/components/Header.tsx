'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white border-b border-gray-300 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <span className="text-xl sm:text-2xl font-bold text-black">FLOW INSIGHT</span>
          <svg width="32" height="32" viewBox="0 0 32 32" className="">
            <polyline
              points="2,20 8,12 14,16 20,8 26,4"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        {/* Desktop Menu - Hidden on mobile */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="relative group">
            <button className="px-4 py-2 text-sm font-mono border border-gray-400 rounded hover:bg-gray-100">
              My Account ▼
            </button>
            <div className="absolute right-0 mt-0 w-32 bg-white border border-gray-400 rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
              <Link href="/login" className="block px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300">
                Login
              </Link>
              <Link href="/signup" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button - Visible only on mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden px-4 py-2 text-sm font-mono border border-gray-400 rounded hover:bg-gray-100"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu - Dropdown */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-300 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            <Link
              href="/login"
              className="block px-4 py-2 text-sm hover:bg-gray-100 rounded border border-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="block px-4 py-2 text-sm hover:bg-gray-100 rounded border border-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}