'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('flowinsight_token');
    const flowinsight_id = localStorage.getItem('flowinsight_id');
    
    if (!token || !flowinsight_id) {
      router.push('/login');
      return;
    }

    setUser({ flowinsight_id });
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600 text-sm">Loading your dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Welcome Section */}
          <div className="mb-12 sm:mb-16">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-gray-200 rounded-xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-medium text-gray-900 mb-2">
                    Welcome back,{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-600">
                      {user?.flowinsight_id?.split('@')[0] || 'User'}
                    </span>
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base">
                    You're logged in as <span className="font-medium">{user?.flowinsight_id}</span>
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm sm:text-base mt-6 leading-relaxed">
                Welcome to Flow Insight. Explore our suite of intelligent business solutions below. Each module is designed to give you real-time insights, root cause analysis, and actionable recommendations.
              </p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-2">
                Available Modules
              </h2>
              <p className="text-gray-600 text-sm">
                Explore all Flow Insight products
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Spirit Flow */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 transition duration-200 hover:shadow-md"
                style={{ borderLeftColor: '#EA4335', borderLeftWidth: '4px' }}>
                <div className="text-5xl mb-4">🍷</div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-3">
                  Spirit Flow
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  Bar and liquor inventory management with real-time variance detection
                </p>
                <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                  Coming Soon
                </span>
              </div>

              {/* Staff Flow */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 transition duration-200 hover:shadow-md"
                style={{ borderLeftColor: '#4285F4', borderLeftWidth: '4px' }}>
                <div className="text-5xl mb-4">👥</div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-3">
                  Staff Flow
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  HR and attendance management with real-time insights
                </p>
                <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                  Coming Soon
                </span>
              </div>

              {/* Cash Flow */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 transition duration-200 hover:shadow-md"
                style={{ borderLeftColor: '#34A853', borderLeftWidth: '4px' }}>
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-3">
                  Cash Flow
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  Financial management and accounting intelligence
                </p>
                <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                  Coming Soon
                </span>
              </div>

              {/* Cuisine Flow */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 transition duration-200 hover:shadow-md"
                style={{ borderLeftColor: '#9C27B0', borderLeftWidth: '4px' }}>
                <div className="text-5xl mb-4">🍽️</div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-3">
                  Cuisine Flow
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  Restaurant operations and menu optimization
                </p>
                <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                  Coming Soon
                </span>
              </div>

              {/* Guest Flow */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 transition duration-200 hover:shadow-md"
                style={{ borderLeftColor: '#FBBC04', borderLeftWidth: '4px' }}>
                <div className="text-5xl mb-4">🏨</div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-3">
                  Guest Flow
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  Guest management and booking system
                </p>
                <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                  Coming Soon
                </span>
              </div>

              {/* Inventory Flow */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 transition duration-200 hover:shadow-md"
                style={{ borderLeftColor: '#FF6D00', borderLeftWidth: '4px' }}>
                <div className="text-5xl mb-4">📦</div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-3">
                  Inventory Flow
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  General stock management and optimization
                </p>
                <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                  Coming Soon
                </span>
              </div>

            </div>
          </div>

          {/* Stats/Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            
            {/* Card 1 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Real-Time Intelligence
              </h3>
              <p className="text-gray-600 text-sm">
                Get live insights and instant alerts for critical business events
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Root Cause Analysis
              </h3>
              <p className="text-gray-600 text-sm">
                Understand why variances happen, not just flag them
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Actionable Insights
              </h3>
              <p className="text-gray-600 text-sm">
                Every insight includes recommended actions for quick decisions
              </p>
            </div>

          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-gray-200 rounded-xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-4">
              Ready to Explore?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
              Check out our live demo to see Flow Insight in action. Discover how real-time intelligence can transform your business decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-sm transition duration-150 shadow-sm hover:shadow-md"
              >
                View Demo
              </Link>
              <Link
                href="/"
                className="bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium text-sm transition duration-150"
              >
                Back to Home
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}