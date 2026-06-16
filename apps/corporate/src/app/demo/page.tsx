'use client';

import Link from 'next/link';

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
      {/* HEADER */}
      <header className="fixed w-full bg-white border-b border-gray-300 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
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
          </Link>

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

      {/* DEMO SECTION */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
              Explore Our Products
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
              Experience the power of Flow Insight with live demos of our core products ready for immediate use.
            </p>
          </div>

          {/* Demo Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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

          {/* Demo Navigation Button */}
          <div className="flex justify-center">
            <Link href="/" className="px-8 py-3 text-sm font-mono border-2 border-green-600 bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors font-bold">
              ← Back to Home
            </Link>
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