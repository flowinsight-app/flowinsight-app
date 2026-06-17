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
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-md">
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold mb-2 font-mono">Account Created Successfully!</h2>
              <p className="text-gray-600 mb-6 font-mono text-sm">
                Your Flow Insight account is ready. Redirecting to dashboard...
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full bg-black text-white py-3 rounded font-mono font-bold hover:bg-gray-800 transition"
                >
                  Go to Dashboard Now
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="w-full bg-gray-200 text-black py-3 rounded font-mono font-bold hover:bg-gray-300 transition"
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-8">
            <h1 className="text-2xl font-bold mb-2 font-mono">Create Account</h1>
            <p className="text-gray-600 mb-8 font-mono text-sm">
              Join Flow Insight and transform your business intelligence
            </p>

            <form onSubmit={handleSignup} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-mono font-bold mb-2">Your Name *</label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded px-3 py-2 font-mono text-sm focus:outline-none focus:border-black transition"
                  placeholder="John Doe"
                />
                {errors.full_name && (
                  <p className="text-red-600 text-xs mt-1 font-mono">{errors.full_name}</p>
                )}
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-mono font-bold mb-2">Username *</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    onBlur={handleUsernameBlur}
                    className="w-full border-2 border-gray-300 rounded px-3 py-2 font-mono text-sm focus:outline-none focus:border-black transition"
                    placeholder="username"
                  />
                  {checkingUsername && (
                    <span className="absolute right-3 top-2.5 text-gray-500 text-sm font-mono">
                      checking...
                    </span>
                  )}
                  {usernameAvailable === true && (
                    <span className="absolute right-3 top-2.5 text-green-600">✓</span>
                  )}
                  {usernameAvailable === false && (
                    <span className="absolute right-3 top-2.5 text-red-600">✗</span>
                  )}
                </div>
                <p className="text-gray-500 text-xs mt-1 font-mono">
                  @flowinsight.app will be added automatically
                </p>
                {errors.username && (
                  <p className="text-red-600 text-xs mt-1 font-mono">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-mono font-bold mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email_id}
                  onChange={(e) => setFormData({ ...formData, email_id: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded px-3 py-2 font-mono text-sm focus:outline-none focus:border-black transition"
                  placeholder="your@email.com"
                />
                {errors.email_id && (
                  <p className="text-red-600 text-xs mt-1 font-mono">{errors.email_id}</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-mono font-bold mb-2">Mobile Number *</label>
                <input
                  type="tel"
                  value={formData.mobile_number}
                  onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded px-3 py-2 font-mono text-sm focus:outline-none focus:border-black transition"
                  placeholder="9876543210"
                />
                {errors.mobile_number && (
                  <p className="text-red-600 text-xs mt-1 font-mono">{errors.mobile_number}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-mono font-bold mb-2">Password *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded px-3 py-2 font-mono text-sm focus:outline-none focus:border-black transition"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1 font-mono">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-mono font-bold mb-2">Confirm Password *</label>
                <input
                  type="password"
                  value={formData.confirm_password}
                  onChange={(e) =>
                    setFormData({ ...formData, confirm_password: e.target.value })
                  }
                  className="w-full border-2 border-gray-300 rounded px-3 py-2 font-mono text-sm focus:outline-none focus:border-black transition"
                  placeholder="••••••••"
                />
                {errors.confirm_password && (
                  <p className="text-red-600 text-xs mt-1 font-mono">{errors.confirm_password}</p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="bg-red-50 border-2 border-red-300 rounded p-3">
                  <p className="text-red-600 text-sm font-mono">{errors.submit}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded font-mono font-bold hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6 pt-6 border-t-2 border-gray-300">
              <p className="text-gray-600 text-sm font-mono">
                Already have an account?{' '}
                <a href="/login" className="text-black font-bold hover:underline">
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}