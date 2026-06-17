'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Real-time username availability check
  const checkUsernameAvailability = async (username: string) => {
    if (username.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    setCheckingUsername(true);
    try {
      // TODO: Replace with actual backend API call
      setUsernameAvailable(true);
    } catch (error) {
      console.error('Error checking username:', error);
    } finally {
      setCheckingUsername(false);
    }
  };

  // Handle username blur to check availability
  const handleUsernameBlur = () => {
    if (formData.username.length >= 3) {
      checkUsernameAvailability(formData.username);
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (formData.username.length > 30) {
      newErrors.username = 'Username must not exceed 30 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    } else if (!usernameAvailable) {
      newErrors.username = 'Username is already taken';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[0-9+\-\s()]{10,13}$/.test(formData.mobileNumber.replace(/\s/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid mobile number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual backend API call
      setSuccess(true);
    } catch (error) {
      setErrors({ submit: 'An error occurred during signup. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Success Message Screen
  if (success) {
    return (
      <div className="w-full bg-white text-black font-mono">
        <Header />

        <div className="pt-20"></div>

        {/* SUCCESS MESSAGE */}
        <section className="w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-300 min-h-screen flex items-center justify-center">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="text-6xl mb-6">✓</div>
              <h1 className="text-4xl sm:text-5xl font-bold text-green-600 mb-4">
                Account Created Successfully!
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 mb-8">
                Your Flow Insight account is ready to use.
              </p>
              <p className="text-gray-600 mb-12 text-sm sm:text-base">
                <strong>{formData.username}@flowinsight.app</strong>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="px-8 py-3 text-sm font-mono border-2 border-black bg-black text-white rounded hover:bg-gray-800 transition-colors font-bold"
              >
                Sign In
              </Link>
              <Link
                href="/"
                className="px-8 py-3 text-sm font-mono border-2 border-gray-400 bg-white text-black rounded hover:bg-gray-100 transition-colors font-bold"
              >
                Go Home
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // Signup Form Screen
  return (
    <div className="w-full bg-white text-black font-mono">
      <Header />

      <div className="pt-20"></div>

      {/* SIGNUP FORM */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-300 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
              Create Account
            </h1>
            <p className="text-gray-700 text-sm sm:text-base">
              Join Flow Insight to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-400 rounded bg-white text-black focus:outline-none focus:border-black text-sm sm:text-base"
              />
              {errors.fullName && (
                <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Username
              </label>
              <div className="flex gap-2 flex-col sm:flex-row">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={handleUsernameBlur}
                  placeholder="john_doe"
                  className="flex-1 px-4 py-2 border border-gray-400 rounded bg-white text-black focus:outline-none focus:border-black text-sm sm:text-base"
                />
                <span className="px-4 py-2 bg-gray-100 border border-gray-400 rounded text-gray-700 whitespace-nowrap text-sm sm:text-base">
                  @flowinsight.app
                </span>
              </div>
              {checkingUsername && (
                <p className="text-gray-600 text-xs sm:text-sm mt-1">Checking availability...</p>
              )}
              {usernameAvailable === true && !checkingUsername && (
                <p className="text-green-600 text-xs sm:text-sm mt-1">✓ Username available</p>
              )}
              {usernameAvailable === false && (
                <p className="text-red-600 text-xs sm:text-sm mt-1">Username not available</p>
              )}
              {errors.username && (
                <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-2 border border-gray-400 rounded bg-white text-black focus:outline-none focus:border-black text-sm sm:text-base"
              />
              {errors.email && (
                <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full px-4 py-2 border border-gray-400 rounded bg-white text-black focus:outline-none focus:border-black text-sm sm:text-base"
              />
              <p className="text-gray-600 text-xs sm:text-sm mt-1">Indian format: +91 or 0 prefix</p>
              {errors.mobileNumber && (
                <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.mobileNumber}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-400 rounded bg-white text-black focus:outline-none focus:border-black text-sm sm:text-base"
              />
              {errors.password && (
                <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-400 rounded bg-white text-black focus:outline-none focus:border-black text-sm sm:text-base"
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <p className="text-red-600 text-sm text-center">{errors.submit}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-black text-white font-bold rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-700 text-xs sm:text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-black font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}