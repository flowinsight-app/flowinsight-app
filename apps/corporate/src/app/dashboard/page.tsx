'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="font-mono text-gray-600">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-white border-2 border-gray-300 rounded-lg p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-mono mb-2">
                  Welcome to Flow Insight
                </h1>
                <p className="text-gray-600 font-mono text-sm">
                  Logged in as: <span className="font-bold">{user?.flowinsight_id}</span>
                </p>
              </div>
            </div>
            <p className="text-gray-600 font-mono text-sm mt-4">
              Your dashboard is ready. Explore Flow Insight products and modules below.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {/* Spirit Flow */}
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-bold font-mono mb-2">Spirit Flow</h3>
              <p className="text-gray-600 font-mono text-sm mb-4">
                Bar and liquor inventory management with real-time variance detection
              </p>
              <button className="text-red-600 font-mono font-bold hover:underline cursor-not-allowed opacity-70">
                Coming Soon
              </button>
            </div>

            {/* Staff Flow */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-bold font-mono mb-2">Staff Flow</h3>
              <p className="text-gray-600 font-mono text-sm mb-4">
                HR and attendance management with real-time insights
              </p>
              <button className="text-blue-600 font-mono font-bold hover:underline cursor-not-allowed opacity-70">
                Coming Soon
              </button>
            </div>

            {/* Cash Flow */}
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-bold font-mono mb-2">Cash Flow</h3>
              <p className="text-gray-600 font-mono text-sm mb-4">
                Financial management and accounting intelligence
              </p>
              <button className="text-green-600 font-mono font-bold hover:underline cursor-not-allowed opacity-70">
                Coming Soon
              </button>
            </div>

            {/* Cuisine Flow */}
            <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-bold font-mono mb-2">Cuisine Flow</h3>
              <p className="text-gray-600 font-mono text-sm mb-4">
                Restaurant operations and menu optimization
              </p>
              <button className="text-purple-600 font-mono font-bold hover:underline cursor-not-allowed opacity-70">
                Coming Soon
              </button>
            </div>

            {/* Guest Flow */}
            <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-bold font-mono mb-2">Guest Flow</h3>
              <p className="text-gray-600 font-mono text-sm mb-4">
                Guest management and booking system
              </p>
              <button className="text-orange-600 font-mono font-bold hover:underline cursor-not-allowed opacity-70">
                Coming Soon
              </button>
            </div>

            {/* Inventory Flow */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-bold font-mono mb-2">Inventory Flow</h3>
              <p className="text-gray-600 font-mono text-sm mb-4">
                General stock management and optimization
              </p>
              <button className="text-amber-600 font-mono font-bold hover:underline cursor-not-allowed opacity-70">
                Coming Soon
              </button>
            </div>
          </div>

          {/* Footer Info */}
          <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6">
            <h3 className="font-bold font-mono mb-2">Getting Started</h3>
            <p className="text-gray-600 font-mono text-sm mb-4">
              More features and modules are coming soon. Stay tuned for updates!
            </p>
            <a href="/" className="text-black font-mono font-bold hover:underline">
              Back to Home
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}