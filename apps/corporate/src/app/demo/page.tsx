'use client';

import Link from 'next/link';

export default function DemoPage() {
  const demoProducts = [
    {
      name: 'Clinic Flow',
      color: 'bg-orange-50',
      borderColor: 'border-orange-300',
      description: 'Healthcare facility operations platform. Manage patients, clinics, appointments, medical records, and streamline clinical workflows.',
      icon: '🏥'
    },
    {
      name: 'Doctor Flow',
      color: 'bg-blue-50',
      borderColor: 'border-blue-300',
      description: 'Uber-style marketplace connecting doctors with healthcare facilities. Real-time location matching, smart notifications, and direct connections.',
      icon: '👨‍⚕️'
    },
    {
      name: 'Spirit Flow',
      color: 'bg-red-50',
      borderColor: 'border-red-300',
      description: 'Bar and liquor management system. Real-time inventory tracking, variance detection, stock transfers, and profit optimization for beverage operations.',
      icon: '🍷'
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

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {/* Demo Button (Active) */}
            <button className="px-4 py-2 text-sm font-mono border border-green-600 bg-green-100 text-green-700 rounded font-bold">
              Demo
            </button>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demoProducts.map((product) => (
              <div key={product.name} className={`${product.color} border ${product.borderColor} rounded-lg p-8 hover:shadow-xl transition-shadow`}>
                <div className="text-5xl mb-4">{product.icon}</div>
                <h3 className="text-2xl font-bold text-black mb-4">{product.name}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {product.description}
                </p>
                <button className="w-full px-4 py-3 bg-black text-white font-bold rounded hover:bg-gray-800 transition-colors">
                  View Demo
                </button>
              </div>
            ))}
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