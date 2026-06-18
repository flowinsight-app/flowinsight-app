'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Dashboard() {
  const [fullName, setFullName] = useState<string | null>(null);
  const [flowinsightId, setFlowinsightId] = useState<string | null>(null);

  useEffect(() => {
    const name = localStorage.getItem('flowinsight_fullname');
    const id = localStorage.getItem('flowinsight_id');
    setFullName(name);
    setFlowinsightId(id);
  }, []);

  const myProducts = [
    {
      name: 'Clinic Flow',
      icon: '🏥',
      color: 'bg-blue-50',
      borderColor: '#2563EB',
      textColor: '#2563EB',
      description: 'Healthcare facility operations platform. Manage patients, clinics, appointments, medical records, and streamline clinical workflows.',
      status: 'Active'
    },
    {
      name: 'Doctor Flow',
      icon: '👨‍⚕️',
      color: 'bg-sky-50',
      borderColor: '#4285F4',
      textColor: '#4285F4',
      description: 'Real-time marketplace connecting doctors with healthcare facilities. Location-aware matching, smart notifications, and direct connections.',
      status: 'Active'
    }
  ];

  const availableProducts = [
    {
      name: 'Cash Flow',
      icon: '💰',
      color: 'bg-green-50',
      borderColor: '#059669',
      textColor: '#059669',
      description: 'Complete financial management and accounting solution. Track transactions, manage invoices, analyze cash flow, and generate financial reports in real-time.'
    },
    {
      name: 'Guest Flow',
      icon: '🏨',
      color: 'bg-orange-50',
      borderColor: '#EA580C',
      textColor: '#EA580C',
      description: 'Comprehensive guest management system. Manage bookings, reservations, loyalty programs, and guest communications for hospitality services.'
    },
    {
      name: 'Cuisine Flow',
      icon: '🍽️',
      color: 'bg-purple-50',
      borderColor: '#7C3AED',
      textColor: '#7C3AED',
      description: 'Restaurant operations management. Food cost tracking, recipe management, menu optimization, and kitchen operations for culinary businesses.'
    },
    {
      name: 'Spirit Flow',
      icon: '🍷',
      color: 'bg-red-50',
      borderColor: '#F43F5E',
      textColor: '#F43F5E',
      description: 'Bar and liquor management system. Real-time inventory tracking, variance detection, stock transfers, and profit optimization for beverage operations.'
    }
  ];

  return (
    <div className="w-full bg-white text-gray-900">
      <Header />

      <div className="pt-4"></div>

      {/* ===== WELCOME SECTION ===== */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-white">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Welcome back,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
                  {fullName || 'User'}
                </span>
                ! 👋
              </h1>
              
              <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
                You're all set to manage your business operations with real-time intelligence and actionable insights. Let's get started!
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl font-bold text-cyan-200 mb-2">{myProducts.length}</div>
                  <div className="text-sm sm:text-base text-blue-100">Active Products</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl font-bold text-cyan-200 mb-2">{availableProducts.length}</div>
                  <div className="text-sm sm:text-base text-blue-100">Available</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 sm:p-6 col-span-2 sm:col-span-1">
                  <div className="text-3xl sm:text-4xl font-bold text-cyan-200 mb-2">100%</div>
                  <div className="text-sm sm:text-base text-blue-100">Access</div>
                </div>
              </div>

              {/* Account Info */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                <p className="text-xs sm:text-sm text-blue-200 uppercase tracking-widest font-semibold mb-2">Your Account</p>
                <p className="text-xl sm:text-2xl font-bold text-white break-all">{flowinsightId || 'Not logged in'}</p>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur-3xl opacity-20"></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
                  <div className="text-7xl mb-6">🚀</div>
                  <h3 className="text-2xl font-bold text-white mb-3">Ready to Transform?</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Harness the power of real-time intelligence to make smarter decisions faster than ever before.
                  </p>
                  <div className="mt-8 pt-8 border-t border-white/20">
                    <Link
                      href="/demo"
                      className="inline-block bg-white text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-all duration-200"
                    >
                      Explore All Products
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MY PRODUCTS SECTION ===== */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Header */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-900 mb-4">
              My Products
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Your active products that you can access and manage
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {myProducts.map((product) => (
              <div 
                key={product.name}
                className={`${product.color} border-l-4 rounded-lg p-8 sm:p-10 transition-all duration-300 hover:shadow-lg hover:scale-105 border border-gray-200 group`}
                style={{ borderLeftColor: product.borderColor }}
              >
                {/* Product Icon & Name */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-5xl mb-4">{product.icon}</div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <div className="inline-block bg-green-100 text-green-700 text-xs font-bold px-4 py-1.5 rounded-full">
                      ✓ {product.status}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Actions */}
                <div className="flex gap-3 sm:gap-4">
                  <button 
                    className="flex-1 font-semibold py-3 px-6 rounded-lg transition-all duration-200 text-white"
                    style={{ backgroundColor: product.borderColor }}
                  >
                    Access Now
                  </button>
                  <button 
                    className="flex-1 font-semibold py-3 px-6 rounded-lg border-2 transition-all duration-200"
                    style={{ borderColor: product.borderColor, color: product.borderColor }}
                  >
                    Settings
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AVAILABLE PRODUCTS SECTION ===== */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-24 sm:py-32 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Header */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-900 mb-4">
              Explore More Products
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Discover other Flow Insight solutions to expand your business capabilities
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {availableProducts.map((product) => (
              <div 
                key={product.name}
                className={`${product.color} border-t-4 rounded-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border border-gray-200 group`}
                style={{ borderTopColor: product.borderColor }}
              >
                {/* Icon */}
                <div className="text-5xl mb-4">{product.icon}</div>

                {/* Name */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Button */}
                <button 
                  className="w-full font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 text-white"
                  style={{ backgroundColor: product.borderColor }}
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16 sm:mt-20">
            <Link
              href="/demo"
              className="inline-block bg-blue-900 hover:bg-blue-950 text-white font-bold py-4 px-10 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              View All Products Demo
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}