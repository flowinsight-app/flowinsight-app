'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const API_BASE_URL = 'https://flowinsight-app-production.up.railway.app';

  const [formData, setFormData] = useState({
    flowinsight_id: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.flowinsight_id.trim()) {
      newErrors.flowinsight_id = 'Username or email is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flowinsight_id: formData.flowinsight_id,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('flowinsight_token', data.token);
        localStorage.setItem('flowinsight_id', data.data.flowinsight_id);

        document.cookie = `flowinsight_token=${data.token}; path=/; max-age=86400`;

        if (rememberMe) {
          localStorage.setItem('flowinsight_remember', 'true');
        }

        router.push('/dashboard');
      } else {
        setErrors({ submit: data.error || 'Login failed' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-20">
        <div className="w-full max-w-md">
          
          {/* Card Container */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 sm:p-10 shadow-sm">
            
            {/* Logo and Branding */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-6">
                <svg 
                  width="32" 
                  height="32" 
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
              <p className="text-gray-600 text-sm">Where data flows into intelligence</p>
            </div>

            {/* Form Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-medium text-gray-900 mb-2">
                Sign In
              </h1>
              <p className="text-gray-600 text-sm">
                Access your Flow Insight account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* Username/Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Username or Email
                </label>
                <input
                  type="text"
                  value={formData.flowinsight_id}
                  onChange={(e) => setFormData({ ...formData, flowinsight_id: e.target.value })}
                  className={`w-full border rounded-lg px-4 py-3 text-sm font-normal transition focus:outline-none ${
                    errors.flowinsight_id
                      ? 'border-red-500 bg-red-50 focus:border-red-600 focus:shadow-md'
                      : 'border-gray-300 bg-white focus:border-blue-500 focus:shadow-md'
                  }`}
                  placeholder="username@flowinsight.app"
                />
                {errors.flowinsight_id && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.flowinsight_id}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full border rounded-lg px-4 py-3 text-sm font-normal transition focus:outline-none ${
                    errors.password
                      ? 'border-red-500 bg-red-50 focus:border-red-600 focus:shadow-md'
                      : 'border-gray-300 bg-white focus:border-blue-500 focus:shadow-md'
                  }`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 border border-gray-300 rounded cursor-pointer accent-blue-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <a 
                  href="#" 
                  className="text-sm text-blue-500 hover:text-blue-600 transition"
                >
                  Forgot password?
                </a>
              </div>

              {/* Error Message */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-300 rounded-lg p-4">
                  <p className="text-red-600 text-sm">
                    {errors.submit}
                  </p>
                </div>
              )}

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium text-sm transition duration-150 shadow-sm hover:shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="text-xs text-gray-500">NEW TO FLOW INSIGHT?</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Sign Up Link */}
            <a
              href="/signup"
              className="block w-full bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-50 py-3 rounded-lg font-medium text-sm transition duration-150 text-center"
            >
              Create Account
            </a>

            {/* Additional Links */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="space-y-4 text-center">
                <a 
                  href="/" 
                  className="block text-sm text-gray-600 hover:text-blue-500 transition"
                >
                  Explore our products
                </a>
                <a 
                  href="/demo" 
                  className="block text-sm text-gray-600 hover:text-blue-500 transition"
                >
                  View demo
                </a>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-8 text-xs text-gray-500">
            <p>© 2026 Ezhuthola edTech. All rights reserved.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}