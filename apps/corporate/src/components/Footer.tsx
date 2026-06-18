'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        {/* Footer Grid - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <svg 
                width="28" 
                height="28" 
                viewBox="0 0 30 24" 
                fill="none"
              >
                <defs>
                  <linearGradient id="graphGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1A237E" stopOpacity="1" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <polyline
                  points="2,20 8,12 14,16 20,8 26,4"
                  stroke="url(#graphGradientFooter)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-base font-bold text-blue-900 tracking-wide">
                FLOW INSIGHT
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Where data flows into intelligence. Transform business management into proactive, insight-driven operations.
            </p>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="text-sm font-bold text-blue-900 mb-6 tracking-wide uppercase">
              Products
            </h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="#cash-flow"
                  className="text-sm text-gray-700 hover:text-blue-900 transition-colors duration-150 font-medium"
                >
                  Cash Flow
                </Link>
              </li>
              <li>
                <Link 
                  href="#guest-flow"
                  className="text-sm text-gray-700 hover:text-blue-900 transition-colors duration-150 font-medium"
                >
                  Guest Flow
                </Link>
              </li>
              <li>
                <Link 
                  href="#clinic-flow"
                  className="text-sm text-gray-700 hover:text-blue-900 transition-colors duration-150 font-medium"
                >
                  Clinic Flow
                </Link>
              </li>
              <li>
                <Link 
                  href="#cuisine-flow"
                  className="text-sm text-gray-700 hover:text-blue-900 transition-colors duration-150 font-medium"
                >
                  Cuisine Flow
                </Link>
              </li>
              <li>
                <Link 
                  href="#spirit-flow"
                  className="text-sm text-gray-700 hover:text-blue-900 transition-colors duration-150 font-medium"
                >
                  Spirit Flow
                </Link>
              </li>
              <li>
                <Link 
                  href="#doctor-flow"
                  className="text-sm text-gray-700 hover:text-blue-900 transition-colors duration-150 font-medium"
                >
                  Doctor Flow
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-bold text-blue-900 mb-6 tracking-wide uppercase">
              Company
            </h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/"
                  className="text-sm text-gray-700 hover:text-blue-900 transition-colors duration-150 font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/demo"
                  className="text-sm text-gray-700 hover:text-blue-900 transition-colors duration-150 font-medium"
                >
                  Demo
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/flowinsight-erp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700 hover:text-blue-900 transition-colors duration-150 font-medium"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="mailto:flowinsight.app@gmail.com"
                  className="text-sm text-gray-700 hover:text-blue-900 transition-colors duration-150 font-medium"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-bold text-blue-900 mb-6 tracking-wide uppercase">
              Contact
            </h3>
            <ul className="space-y-5">
              <li>
                <p className="text-xs font-bold text-blue-900 mb-1 uppercase">Email</p>
                <a 
                  href="mailto:flowinsight.app@gmail.com"
                  className="text-sm text-gray-700 hover:text-blue-900 transition-colors duration-150 break-all font-medium"
                >
                  flowinsight.app@gmail.com
                </a>
              </li>
              <li>
                <p className="text-xs font-bold text-blue-900 mb-1 uppercase">Phone</p>
                <a 
                  href="tel:+917034484222"
                  className="text-sm text-gray-700 hover:text-blue-900 transition-colors duration-150 font-medium"
                >
                  +91 7034484222
                </a>
              </li>
              <li>
                <p className="text-xs font-bold text-blue-900 mb-1 uppercase">Location</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Kannur, Kerala<br />
                  India
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 pt-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-xs text-gray-700 font-medium">
            © {currentYear} Flow Insight. Built by{' '}
            <a 
              href="https://ezhuthola.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-900 hover:text-blue-950 transition-colors duration-150 font-bold"
            >
              Ezhuthola edTech
            </a>
            . All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex gap-8">
            <a 
              href="#privacy"
              className="text-xs text-gray-700 hover:text-blue-900 transition-colors duration-150 font-medium"
            >
              Privacy Policy
            </a>
            <a 
              href="#terms"
              className="text-xs text-gray-700 hover:text-blue-900 transition-colors duration-150 font-medium"
            >
              Terms of Service
            </a>
            <a 
              href="#cookies"
              className="text-xs text-gray-700 hover:text-blue-900 transition-colors duration-150 font-medium"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}