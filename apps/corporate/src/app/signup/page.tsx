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

  // Check username availability
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

  // Handle username blur
  const handleUsernameBlur = () => {
    checkUsername(formData.username);
  };

  // Validate form
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

  // Handle signup
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

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-20">
          <div className="w-full max-w-md">
            <div className="bg-green-50 border border-green-300 rounded-xl p-8 sm:p-10 text-center shadow-sm">
              <div className="text-6xl mb-6">✓</div>
              <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-3">
                Account Created!
              </h2>
              <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                Your Flow Insight account is ready. Redirecting to dashboard...
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium text-sm transition duration-150 shadow-sm hover:shadow-md"
                >
                  Go to Dashboard Now
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="w-full bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 py-3 rounded-lg font-medium text-sm transition duration-150"
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

  // Signup form
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-20">
        <div className="w-full max-w-lg">
          
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
              <p className="text-gray-600 text-sm">
                Transform your business with real-time intelligence
              </p>
            </div>

            {/* Form Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-medium text-gray-900 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600 text-sm">
                Join Flow Insight and transform your business intelligence
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignup} className="space-y-6">
              
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className={`w-full border rounded-lg px-4 py-3 text-sm font-normal transition focus:outline-none ${
                    errors.full_name
                      ? 'border-red-500 bg-red-50 focus:border-red-600 focus:shadow-md'
                      : 'border-gray-300 bg-white focus:border-blue-500 focus:shadow-md'
                  }`}
                  placeholder="John Doe"
                />
                {errors.full_name && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.full_name}
                  </p>
                )}
              </div>

              {/* Username */}
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
                    className={`w-full border rounded-lg px-4 py-3 text-sm font-normal transition focus:outline-none pr-10 ${
                      errors.username
                        ? 'border-red-500 bg-red-50 focus:border-red-600 focus:shadow-md'
                        : 'border-gray-300 bg-white focus:border-blue-500 focus:shadow-md'
                    }`}
                    placeholder="username"
                  />
                  {checkingUsername && (
                    <span className="absolute right-4 top-3.5 text-gray-500 text-sm animate-pulse">
                      checking...
                    </span>
                  )}
                  {usernameAvailable === true && (
                    <span className="absolute right-4 top-3.5 text-green-600 font-bold text-lg">
                      ✓
                    </span>
                  )}
                  {usernameAvailable === false && (
                    <span className="absolute right-4 top-3.5 text-red-600 font-bold text-lg">
                      ✕
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-xs mt-2">
                  @flowinsight.app will be added automatically
                </p>
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email_id}
                  onChange={(e) => setFormData({ ...formData, email_id: e.target.value })}
                  className={`w-full border rounded-lg px-4 py-3 text-sm font-normal transition focus:outline-none ${
                    errors.email_id
                      ? 'border-red-500 bg-red-50 focus:border-red-600 focus:shadow-md'
                      : 'border-gray-300 bg-white focus:border-blue-500 focus:shadow-md'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email_id && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.email_id}
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={formData.mobile_number}
                  onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                  className={`w-full border rounded-lg px-4 py-3 text-sm font-normal transition focus:outline-none ${
                    errors.mobile_number
                      ? 'border-red-500 bg-red-50 focus:border-red-600 focus:shadow-md'
                      : 'border-gray-300 bg-white focus:border-blue-500 focus:shadow-md'
                  }`}
                  placeholder="+91 9876543210"
                />
                {errors.mobile_number && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.mobile_number}
                  </p>
                )}
              </div>

              {/* Password */}
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
                <p className="text-gray-500 text-xs mt-2">
                  At least 8 characters
                </p>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
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
                  className={`w-full border rounded-lg px-4 py-3 text-sm font-normal transition focus:outline-none ${
                    errors.confirm_password
                      ? 'border-red-500 bg-red-50 focus:border-red-600 focus:shadow-md'
                      : 'border-gray-300 bg-white focus:border-blue-500 focus:shadow-md'
                  }`}
                  placeholder="••••••••"
                />
                {errors.confirm_password && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.confirm_password}
                  </p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-300 rounded-lg p-4">
                  <p className="text-red-600 text-sm">
                    {errors.submit}
                  </p>
                </div>
              )}

              {/* Create Account Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium text-sm transition duration-150 shadow-sm hover:shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="text-xs text-gray-500">ALREADY HAVE ACCOUNT?</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Sign In Link */}
            <a
              href="/login"
              className="block w-full bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-50 py-3 rounded-lg font-medium text-sm transition duration-150 text-center"
            >
              Sign In
            </a>
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