'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DemoPage() {
  const demoProducts = [
    {
      name: 'Clinic Flow',
      color: 'bg-orange-50',
      borderColor: 'border-orange-300',
      description: 'Healthcare facility operations platform. Manage patients, clinics, appointments, medical records, and streamline clinical workflows.',
      icon: '🏥',
      isActive: false
    },
    {
      name: 'Doctor Flow',
      color: 'bg-blue-50',
      borderColor: 'border-blue-300',
      description: 'Real-time marketplace connecting doctors with healthcare facilities. Location-aware matching, smart notifications, and direct connections.',
      icon: '👨‍⚕️',
      isActive: true
    },
    {
      name: 'Cash Flow',
      color: 'bg-green-50',
      borderColor: 'border-green-300',
      description: 'Complete financial management and accounting solution. Track transactions, manage invoices, analyze cash flow, and generate financial reports in real-time.',
      icon: '💰',
      isActive: false
    },
    {
      name: 'Guest Flow',
      color: 'bg-blue-100',
      borderColor: 'border-blue-400',
      description: 'Comprehensive guest management system. Manage bookings, reservations, loyalty programs, and guest communications for hospitality services.',
      icon: '🏨',
      isActive: false
    },
    {
      name: 'Cuisine Flow',
      color: 'bg-purple-50',
      borderColor: 'border-purple-300',
      description: 'Restaurant operations management. Food cost tracking, recipe management, menu optimization, and kitchen operations for culinary businesses.',
      icon: '🍽️',
      isActive: false
    },
    {
      name: 'Spirit Flow',
      color: 'bg-red-50',
      borderColor: 'border-red-300',
      description: 'Bar and liquor management system. Real-time inventory tracking, variance detection, stock transfers, and profit optimization for beverage operations.',
      icon: '🍷',
      isActive: false
    }
  ];

  return (
    <div className="w-full bg-white text-black font-mono">
      <Header />

      <div className="pt-20"></div>

      {/* DEMO SECTION */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-4">
              Explore Our Products
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
              Experience the power of Flow Insight with live demos of our core products ready for immediate use.
            </p>
          </div>

          {/* Demo Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demoProducts.map((product) => (
              <div key={product.name} className={`${product.color} border ${product.borderColor} rounded-lg p-8 hover:shadow-xl transition-shadow`}>
                <div className="text-5xl mb-4">{product.icon}</div>
                <h3 className="text-2xl font-bold text-black mb-4">{product.name}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {product.description}
                </p>
                <button 
                  disabled={!product.isActive}
                  className={`w-full px-4 py-3 font-bold rounded transition-colors ${
                    product.isActive
                      ? 'bg-black text-white hover:bg-gray-800 cursor-pointer'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  {product.isActive ? 'View Demo' : 'Coming Soon'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}