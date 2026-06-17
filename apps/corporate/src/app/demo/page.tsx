'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DemoPage() {
  const demoProducts = [
    {
      name: 'Doctor Flow',
      color: 'bg-sky-50',
      borderColor: '#4285F4',
      textColor: '#4285F4',
      description: 'Real-time marketplace connecting doctors with healthcare facilities. Location-aware matching, smart notifications, and direct connections.',
      icon: '👨‍⚕️',
      isActive: true
    },
    {
      name: 'Clinic Flow',
      color: 'bg-orange-50',
      borderColor: '#FF6D00',
      textColor: '#FF6D00',
      description: 'Healthcare facility operations platform. Manage patients, clinics, appointments, medical records, and streamline clinical workflows.',
      icon: '🏥',
      isActive: false
    },
    {
      name: 'Cash Flow',
      color: 'bg-emerald-50',
      borderColor: '#34A853',
      textColor: '#34A853',
      description: 'Complete financial management and accounting solution. Track transactions, manage invoices, analyze cash flow, and generate financial reports in real-time.',
      icon: '💰',
      isActive: false
    },
    {
      name: 'Guest Flow',
      color: 'bg-amber-50',
      borderColor: '#FBBC04',
      textColor: '#F9AB00',
      description: 'Comprehensive guest management system. Manage bookings, reservations, loyalty programs, and guest communications for hospitality services.',
      icon: '🏨',
      isActive: false
    },
    {
      name: 'Cuisine Flow',
      color: 'bg-purple-50',
      borderColor: '#9C27B0',
      textColor: '#9C27B0',
      description: 'Restaurant operations management. Food cost tracking, recipe management, menu optimization, and kitchen operations for culinary businesses.',
      icon: '🍽️',
      isActive: false
    },
    {
      name: 'Spirit Flow',
      color: 'bg-red-50',
      borderColor: '#EA4335',
      textColor: '#EA4335',
      description: 'Bar and liquor management system. Real-time inventory tracking, variance detection, stock transfers, and profit optimization for beverage operations.',
      icon: '🍷',
      isActive: false
    }
  ];

  return (
    <div className="w-full bg-white text-gray-900">
      <Header />

      <div className="pt-4"></div>

      {/* HERO SECTION */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-32 lg:py-40 bg-white">
        <div className="max-w-5xl mx-auto w-full text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 mb-6 sm:mb-8 leading-tight tracking-tight">
            Explore Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-600">
              Products
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto">
            Experience the power of Flow Insight with live demos of our core products. See real-time intelligence, root cause analysis, and actionable insights in action.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link
              href="/signup"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-base transition duration-150 shadow-sm hover:shadow-md"
            >
              Get Started
            </Link>
            <Link
              href="/"
              className="bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium text-base transition duration-150"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* DEMO PRODUCTS SECTION */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Title */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-4">
              Available Demos
            </h2>
            <p className="text-lg text-gray-600">
              Try our products with live demonstrations
            </p>
          </div>

          {/* Demo Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {demoProducts.map((product) => (
              <div 
                key={product.name}
                className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 transition duration-200 hover:shadow-md"
                style={{
                  borderLeftColor: product.borderColor,
                  borderLeftWidth: '4px'
                }}
              >
                {/* Icon */}
                <div className="text-5xl mb-4">{product.icon}</div>

                {/* Product Name */}
                <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-3">
                  {product.name}
                </h3>

                {/* Status Badge */}
                {product.isActive ? (
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
                    Live Demo Available
                  </span>
                ) : (
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
                    Coming Soon
                  </span>
                )}

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Button */}
                <button 
                  disabled={!product.isActive}
                  style={{
                    backgroundColor: product.isActive ? product.borderColor : '#e5e7eb',
                    color: product.isActive ? 'white' : '#6b7280'
                  }}
                  className={`w-full px-4 py-3 font-medium rounded-lg transition duration-150 text-sm ${
                    product.isActive
                      ? 'hover:shadow-md cursor-pointer'
                      : 'cursor-not-allowed'
                  }`}
                >
                  {product.isActive ? 'View Demo →' : 'Coming Soon'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-gradient-to-r from-blue-50 to-green-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto w-full text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
            Try Flow Insight today and experience real-time business intelligence that transforms decision-making.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-base transition duration-150 shadow-sm hover:shadow-md"
            >
              Start Free Trial
            </Link>
            <Link
              href="/"
              className="bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium text-base transition duration-150"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}