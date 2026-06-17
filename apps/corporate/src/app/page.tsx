'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
      color: 'bg-emerald-50',
      borderColor: '#34A853',
      textColor: '#34A853',
      description: 'Complete financial management and accounting solution. Track transactions, manage invoices, analyze cash flow, and generate financial reports in real-time.'
    },
    {
      name: 'Guest Flow',
      color: 'bg-amber-50',
      borderColor: '#FBBC04',
      textColor: '#F9AB00',
      description: 'Comprehensive guest management system. Manage bookings, reservations, loyalty programs, and guest communications for hospitality services.'
    },
    {
      name: 'Clinic Flow',
      color: 'bg-orange-50',
      borderColor: '#FF6D00',
      textColor: '#FF6D00',
      description: 'Healthcare facility operations platform. Manage patients, clinics, appointments, medical records, and streamline clinical workflows.'
    },
    {
      name: 'Cuisine Flow',
      color: 'bg-purple-50',
      borderColor: '#9C27B0',
      textColor: '#9C27B0',
      description: 'Restaurant operations management. Food cost tracking, recipe management, menu optimization, and kitchen operations for culinary businesses.'
    },
    {
      name: 'Spirit Flow',
      color: 'bg-red-50',
      borderColor: '#EA4335',
      textColor: '#EA4335',
      description: 'Bar and liquor management system. Real-time inventory tracking, variance detection, stock transfers, and profit optimization for beverage operations.'
    },
    {
      name: 'Inventory Flow',
      color: 'bg-sky-50',
      borderColor: '#4285F4',
      textColor: '#4285F4',
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
    <div className="w-full bg-white text-gray-900">
      <Header />

      {/* Add padding to account for fixed header */}
      <div className="pt-4"></div>

      {/* ===== HERO SECTION ===== */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-32 lg:py-40 bg-white">
        <div className="max-w-5xl mx-auto w-full text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 mb-6 sm:mb-8 leading-tight tracking-tight">
            Where Data Flows Into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-600">
              Intelligence
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto">
            Transform traditional business management into proactive, insight-driven operations. Real-time intelligence, root cause analysis, and actionable recommendations for every decision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link
              href="/signup"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-base transition duration-150 shadow-sm hover:shadow-md"
            >
              Get Started
            </Link>
            <Link
              href="/demo"
              className="bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium text-base transition duration-150"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ===== AUTO SLIDING SECTION ===== */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-5xl mx-auto w-full">
          {/* Sliding Content with Parallax */}
          <div 
            className="min-h-72 flex flex-col justify-center items-center transition-all duration-700"
            style={{ transform: `translateY(${Math.min(scrollY * 0.2, 30)}px)` }}
          >
            <div className="w-full text-center px-4">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-6 leading-tight">
                {slidingPoints[activePoint].title}
              </h3>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                {slidingPoints[activePoint].description}
              </p>
            </div>

            {/* Indicators - Dots */}
            <div className="flex gap-2 mt-12 justify-center">
              {slidingPoints.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActivePoint(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === activePoint
                      ? 'bg-blue-500 w-8 h-2'
                      : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Title */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-4">
              Our Products
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive business solutions for every industry
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {products.map((product) => (
              <div 
                key={product.name}
                className={`${product.color} border-l-4 rounded-xl p-6 sm:p-8 transition duration-200 hover:shadow-md`}
                style={{ borderLeftColor: product.borderColor }}
              >
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-3">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                  {product.description}
                </p>
                <a 
                  href="#"
                  className="text-sm font-medium hover:opacity-80 transition"
                  style={{ color: product.textColor }}
                >
                  Learn more →
                </a>
              </div>
            ))}
          </div>

          {/* Demo Button */}
          <div className="flex justify-center">
            <Link
              href="/demo"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-base transition duration-150 shadow-sm hover:shadow-md"
            >
              View Full Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-16">
            Why Flow Insight?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
            {/* Feature 1 */}
            <div>
              <div className="mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Real-Time Intelligence</h3>
              <p className="text-gray-600 leading-relaxed">
                Live insights, not historical reports. Get actionable intelligence within hours, not days. Make faster, better decisions with current data.
              </p>
            </div>

            {/* Feature 2 */}
            <div>
              <div className="mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Root Cause Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Understand why variances happened, not just flag them. Every variance comes with root cause analysis and who caused it.
              </p>
            </div>

            {/* Feature 3 */}
            <div>
              <div className="mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Actionable Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Every insight includes recommended actions. Our system guides you toward the right decisions with confidence.
              </p>
            </div>

            {/* Feature 4 */}
            <div>
              <div className="mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Complete Audit Trail</h3>
              <p className="text-gray-600 leading-relaxed">
                Every transaction recorded with WHO, WHAT, WHEN, WHERE, WHY. Non-repudiation guaranteed for compliance and security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-gradient-to-r from-blue-50 to-green-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto w-full text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
            Join organizations using Flow Insight to make faster, better decisions with real-time intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-base transition duration-150 shadow-sm hover:shadow-md"
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo"
              className="bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium text-base transition duration-150"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}