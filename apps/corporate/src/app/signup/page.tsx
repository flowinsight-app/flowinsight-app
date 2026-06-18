'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SignupPage() {
  const router = useRouter();
  const API_BASE_URL = 'https://flowinsight-app-production.up.railway.app';

  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email_id: '',
    mobile_number: '',
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const checkUsername = async (username: string) => {
    if (username.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    setCheckingUsername(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/auth/check-username?username=${username}`,
        { method: 'GET' }
      );
      const data = await response.json();
      setUsernameAvailable(data.available);
    } catch (error) {
      console.error('Error checking username:', error);
      setUsernameAvailable(null);
    } finally {
      setCheckingUsername(false);
    }
  };

  const handleUsernameBlur = () => {
    checkUsername(formData.username);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }

    if (!formData.username || formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email_id.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email_id = 'Valid email is required';
    }

    if (!formData.mobile_number.match(/^[0-9]{10,13}$/)) {
      newErrors.mobile_number = 'Valid mobile number required (10-13 digits)';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    if (usernameAvailable === false) {
      newErrors.username = 'Username already taken';
    }

    if (usernameAvailable === null && formData.username) {
      newErrors.username = 'Please check username availability';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          username: formData.username,
          email_id: formData.email_id,
          mobile_number: formData.mobile_number,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        // Store token in localStorage
        localStorage.setItem('flowinsight_token', data.token);
        localStorage.setItem('flowinsight_id', data.data.flowinsight_id);
        localStorage.setItem('flowinsight_fullname', data.data.full_name);  // ← ADDED

        // Store token in cookie for middleware
        document.cookie = `flowinsight_token=${data.token}; path=/; max-age=86400`;

        // Redirect after 2 seconds
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setErrors({ submit: data.error || 'Signup failed' });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-20">
          <div className="w-full max-w-md">
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 sm:p-10 text-center shadow-sm">
              <div className="text-6xl mb-6">✓</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">
                Account Created!
              </h2>
              <p className="text-gray-600 mb-10 text-sm leading-relaxed">
                Your Flow Insight account is ready. Redirecting to dashboard...
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full bg-blue-900 hover:bg-blue-950 text-white py-2.5 rounded-md font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Go to Dashboard Now
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="w-full bg-white text-blue-900 border-2 border-blue-900 hover:bg-gray-50 py-2.5 rounded-md font-medium text-sm transition-all duration-200"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="w-full max-w-md">
          
          <div className="bg-white border border-gray-200 rounded-lg p-8 sm:p-10 shadow-sm">
            
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-6">
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 30 24" 
                  fill="none"
                >
                  <defs>
                    <linearGradient id="graphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1A237E" stopOpacity="1" />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity="1" />
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
                <span className="text-base font-semibold text-blue-900 tracking-wide">
                  FLOW INSIGHT
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">
                Create Account
              </h1>
              <p className="text-sm text-gray-600">
                Join Flow Insight to transform your business
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className={`w-full border rounded-md px-4 py-2.5 text-sm font-normal transition-all duration-150 focus:outline-none ${
                    errors.full_name
                      ? 'border-red-500 bg-red-50 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                  }`}
                  placeholder="John Doe"
                />
                {errors.full_name && (
                  <p className="text-red-600 text-xs mt-1.5 font-medium">
                    {errors.full_name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    onBlur={handleUsernameBlur}
                    className={`w-full border rounded-md px-4 py-2.5 text-sm font-normal transition-all duration-150 focus:outline-none pr-10 ${
                      errors.username
                        ? 'border-red-500 bg-red-50 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                        : 'border-gray-300 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                    }`}
                    placeholder="username"
                  />
                  {checkingUsername && (
                    <span className="absolute right-4 top-3 text-gray-500 text-xs animate-pulse">
                      checking...
                    </span>
                  )}
                  {usernameAvailable === true && (
                    <span className="absolute right-4 top-2.5 text-green-600 font-bold text-lg">
                      ✓
                    </span>
                  )}
                  {usernameAvailable === false && (
                    <span className="absolute right-4 top-2.5 text-red-600 font-bold text-lg">
                      ✕
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-xs mt-1.5">
                  @flowinsight.app will be added automatically
                </p>
                {errors.username && (
                  <p className="text-red-600 text-xs mt-1 font-medium">
                    {errors.username}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email_id}
                  onChange={(e) => setFormData({ ...formData, email_id: e.target.value })}
                  className={`w-full border rounded-md px-4 py-2.5 text-sm font-normal transition-all duration-150 focus:outline-none ${
                    errors.email_id
                      ? 'border-red-500 bg-red-50 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email_id && (
                  <p className="text-red-600 text-xs mt-1.5 font-medium">
                    {errors.email_id}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={formData.mobile_number}
                  onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                  className={`w-full border rounded-md px-4 py-2.5 text-sm font-normal transition-all duration-150 focus:outline-none ${
                    errors.mobile_number
                      ? 'border-red-500 bg-red-50 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                  }`}
                  placeholder="+91 9876543210"
                />
                {errors.mobile_number && (
                  <p className="text-red-600 text-xs mt-1.5 font-medium">
                    {errors.mobile_number}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full border rounded-md px-4 py-2.5 text-sm font-normal transition-all duration-150 focus:outline-none ${
                    errors.password
                      ? 'border-red-500 bg-red-50 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                  }`}
                  placeholder="••••••••"
                />
                <p className="text-gray-500 text-xs mt-1.5">
                  At least 8 characters
                </p>
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1 font-medium">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirm_password}
                  onChange={(e) =>
                    setFormData({ ...formData, confirm_password: e.target.value })
                  }
                  className={`w-full border rounded-md px-4 py-2.5 text-sm font-normal transition-all duration-150 focus:outline-none ${
                    errors.confirm_password
                      ? 'border-red-500 bg-red-50 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-300 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                  }`}
                  placeholder="••••••••"
                />
                {errors.confirm_password && (
                  <p className="text-red-600 text-xs mt-1.5 font-medium">
                    {errors.confirm_password}
                  </p>
                )}
              </div>

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-red-600 text-sm font-medium">
                    {errors.submit}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 hover:bg-blue-950 text-white py-2.5 rounded-md font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:shadow-none mt-8"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="text-xs text-gray-500 font-medium">ALREADY HAVE ACCOUNT?</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <a href="/login" className="block w-full bg-white text-blue-900 border-2 border-blue-900 hover:bg-gray-50 py-2.5 rounded-md font-medium text-sm transition-all duration-200 text-center">
              Sign In
            </a>
          </div>

          <div className="text-center mt-8 text-xs text-gray-600">
            <p>© 2026 Ezhuthola edTech. All rights reserved.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}