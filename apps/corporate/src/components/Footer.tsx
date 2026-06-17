'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <svg 
                width="28" 
                height="28" 
                viewBox="0 0 30 24" 
                fill="none"
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
              <span className="text-lg font-medium text-gray-900 tracking-wide">
                FLOW INSIGHT
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Where data flows into intelligence. Transform business management into proactive, insight-driven operations.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide">
              PRODUCTS
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="#cash-flow"
                  className="text-sm text-gray-600 hover:text-blue-500 transition duration-150"
                >
                  Cash Flow
                </Link>
              </li>
              <li>
                <Link 
                  href="#guest-flow"
                  className="text-sm text-gray-600 hover:text-blue-500 transition duration-150"
                >
                  Guest Flow
                </Link>
              </li>
              <li>
                <Link 
                  href="#clinic-flow"
                  className="text-sm text-gray-600 hover:text-blue-500 transition duration-150"
                >
                  Clinic Flow
                </Link>
              </li>
              <li>
                <Link 
                  href="#cuisine-flow"
                  className="text-sm text-gray-600 hover:text-blue-500 transition duration-150"
                >
                  Cuisine Flow
                </Link>
              </li>
              <li>
                <Link 
                  href="#spirit-flow"
                  className="text-sm text-gray-600 hover:text-blue-500 transition duration-150"
                >
                  Spirit Flow
                </Link>
              </li>
              <li>
                <Link 
                  href="#inventory-flow"
                  className="text-sm text-gray-600 hover:text-blue-500 transition duration-150"
                >
                  Inventory Flow
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide">
              COMPANY
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/"
                  className="text-sm text-gray-600 hover:text-blue-500 transition duration-150"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/demo"
                  className="text-sm text-gray-600 hover:text-blue-500 transition duration-150"
                >
                  Demo
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/flowinsight-erp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-blue-500 transition duration-150"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="mailto:flowinsight.app@gmail.com"
                  className="text-sm text-gray-600 hover:text-blue-500 transition duration-150"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide">
              CONTACT
            </h3>
            <ul className="space-y-4">
              <li>
                <p className="text-xs font-semibold text-gray-700 mb-1">Email</p>
                <a 
                  href="mailto:flowinsight.app@gmail.com"
                  className="text-sm text-gray-600 hover:text-blue-500 transition duration-150 break-all"
                >
                  flowinsight.app@gmail.com
                </a>
              </li>
              <li>
                <p className="text-xs font-semibold text-gray-700 mb-1">Phone</p>
                <a 
                  href="tel:+917034484222"
                  className="text-sm text-gray-600 hover:text-blue-500 transition duration-150"
                >
                  +91 7034484222
                </a>
              </li>
              <li>
                <p className="text-xs font-semibold text-gray-700 mb-1">Address</p>
                <p className="text-sm text-gray-600">
                  KP 17/4A, PO Koodali<br />
                  Kannur, Kerala - 670592<br />
                  India
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-sm text-gray-600">
            © {currentYear} Flow Insight. Built by{' '}
            <a 
              href="https://ezhuthola.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 transition duration-150 font-medium"
            >
              Ezhuthola edTech
            </a>
            . All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex gap-6">
            <a 
              href="#privacy"
              className="text-sm text-gray-600 hover:text-blue-500 transition duration-150"
            >
              Privacy
            </a>
            <a 
              href="#terms"
              className="text-sm text-gray-600 hover:text-blue-500 transition duration-150"
            >
              Terms
            </a>
            <a 
              href="#cookies"
              className="text-sm text-gray-600 hover:text-blue-500 transition duration-150"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}