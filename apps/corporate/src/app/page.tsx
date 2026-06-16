'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [activePoint, setActivePoint] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const slidingPoints = [
    {
      title: 'Where Data Flows Into Intelligence',
      description: 'Transform traditional business management into proactive, insight-driven operations'
    },
    {
      title: 'Real-Time Intelligence',
      description: 'Live insights, not historical reports. Decisions made within hours, not days.'
    },
    {
      title: 'Root Cause Analysis',
      description: "Don't just flag variances. Understand why they happened and who caused them."
    },
    {
      title: 'Actionable Recommendations',
      description: 'Every insight includes recommended actions. System guides you toward right decisions.'
    },
    {
      title: 'Complete Audit Trail',
      description: 'Every transaction recorded with WHO, WHAT, WHEN, WHERE, WHY. Non-repudiation guaranteed.'
    },
    {
      title: 'Multi-Tenant Enterprise Scale',
      description: 'One platform, unlimited organizations. Secure isolation, massive scale.'
    }
  ];

  const products = [
    {
      name: 'Cash Flow',
      color: 'bg-green-50',
      borderColor: 'border-green-300',
      description: 'Complete financial management and accounting solution. Track transactions, manage invoices, analyze cash flow, and generate financial reports in real-time.'
    },
    {
      name: 'Guest Flow',
      color: 'bg-blue-50',
      borderColor: 'border-blue-300',
      description: 'Comprehensive guest management system. Manage bookings, reservations, loyalty programs, and guest communications for hospitality services.'
    },
    {
      name: 'Clinic Flow',
      color: 'bg-orange-50',
      borderColor: 'border-orange-300',
      description: 'Healthcare facility operations platform. Manage patients, clinics, appointments, medical records, and streamline clinical workflows.'
    },
    {
      name: 'Cuisine Flow',
      color: 'bg-purple-50',
      borderColor: 'border-purple-300',
      description: 'Restaurant operations management. Food cost tracking, recipe management, menu optimization, and kitchen operations for culinary businesses.'
    },
    {
      name: 'Spirit Flow',
      color: 'bg-red-50',
      borderColor: 'border-red-300',
      description: 'Bar and liquor management system. Real-time inventory tracking, variance detection, stock transfers, and profit optimization for beverage operations.'
    },
    {
      name: 'Inventory Flow',
      color: 'bg-amber-50',
      borderColor: 'border-amber-300',
      description: 'Advanced inventory optimization platform. Multi-location stock management, demand forecasting, supplier coordination, and supply chain intelligence.'
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePoint((prev) => (prev + 1) % slidingPoints.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slidingPoints.length]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full bg-white text-black font-mono">
      {/* HEADER */}
      <header className="fixed w-full bg-white border-b border-gray-300 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-black">FLOW INSIGHT</span>
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
          </div>

          {/* My Account Dropdown */}
          <div className="relative group">
            <button className="px-4 py-2 text-sm font-mono border border-gray-400 rounded hover:bg-gray-100">
              My Account ▼
            </button>
            <div className="absolute right-0 mt-0 w-32 bg-white border border-gray-400 rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
              <a href="#login" className="block px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300">
                Login
              </a>
              <a href="#signup" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Add padding to account for fixed header */}
      <div className="pt-20"></div>

      {/* AUTO SLIDING SECTION WITH PARALLAX - REDUCED HEIGHT */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto w-full">
          {/* Sliding Content with Parallax */}
          <div 
            className="h-64 sm:h-72 flex flex-col justify-center items-center transition-transform duration-500"
            style={{ transform: `translateY(${Math.min(scrollY * 0.3, 40)}px)` }}
          >
            <div className="w-full max-w-3xl text-center">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600 mb-6">
                {slidingPoints[activePoint].title}
              </h3>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                {slidingPoints[activePoint].description}
              </p>
            </div>

            {/* Indicators */}
            <div className="flex gap-2 mt-8">
              {slidingPoints.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActivePoint(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activePoint
                      ? 'bg-black w-8'
                      : 'bg-gray-400 hover:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION SECTION - SIDE BY SIDE ON LARGE SCREENS */}
      <section className="w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-8">Mission</h2>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                Eliminate the gap between data existence and data utilization by creating intelligent, 
                real-time insights that enable organizations to make data-driven decisions at every level.
              </p>
            </div>

            {/* Vision */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-8">Vision</h2>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                Where Data Flows Into Intelligence - Transforming traditional business management 
                into proactive, insight-driven operations across all industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-12">Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.name} className={`${product.color} border ${product.borderColor} rounded p-6 hover:shadow-lg transition-shadow`}>
                <h3 className="text-lg sm:text-xl font-bold text-black mb-3">{product.name}</h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-12">Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-black mb-2">Email</h3>
              <p className="text-gray-700">flowinsight.app@gmail.com</p>
            </div>
            <div>
              <h3 className="font-bold text-black mb-2">Phone</h3>
              <p className="text-gray-700">+91 7034484222</p>
            </div>
            <div>
              <h3 className="font-bold text-black mb-2">Address</h3>
              <p className="text-gray-700">KP 17/4A, PO Koodali, Kannur, Kerala - 670592</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-black text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© 2026 Ezhuthola edTech Private Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}