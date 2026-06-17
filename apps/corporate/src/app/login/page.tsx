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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold font-mono mb-2">FLOW INSIGHT</h1>
              <p className="text-gray-600 font-mono text-sm">Where Data Flows Into Intelligence</p>
            </div>

            <h2 className="text-xl font-bold mb-2 font-mono">Sign In</h2>
            <p className="text-gray-600 mb-8 font-mono text-sm">Access your Flow Insight account</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-mono font-bold mb-2">Username or Email *</label>
                <input
                  type="text"
                  value={formData.flowinsight_id}
                  onChange={(e) => setFormData({ ...formData, flowinsight_id: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded px-3 py-2 font-mono text-sm focus:outline-none focus:border-black transition"
                  placeholder="yourname@flowinsight.app"
                />
                {errors.flowinsight_id && (
                  <p className="text-red-600 text-xs mt-1 font-mono">{errors.flowinsight_id}</p>
                )}
              </div>

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

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 border-2 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember" className="ml-2 text-sm font-mono cursor-pointer">
                  Remember me
                </label>
              </div>

              {errors.submit && (
                <div className="bg-red-50 border-2 border-red-300 rounded p-3">
                  <p className="text-red-600 text-sm font-mono">{errors.submit}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded font-mono font-bold hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-1 border-t-2 border-gray-300"></div>
              <span className="px-4 text-gray-500 font-mono text-sm">or</span>
              <div className="flex-1 border-t-2 border-gray-300"></div>
            </div>

            <div className="space-y-3">
              <div className="text-center">
                <p className="text-gray-600 text-sm font-mono">
                  Do not have account?{' '}
                  <a href="/signup" className="text-black font-bold hover:underline">
                    Create one
                  </a>
                </p>
              </div>

              <div className="text-center">
                <a href="#" className="text-gray-600 text-sm font-mono hover:underline">
                  Forgot password?
                </a>
              </div>

              <div className="text-center pt-4 border-t-2 border-gray-300">
                <p className="text-gray-500 text-xs font-mono mb-2">New to Flow Insight?</p>
                <a href="/" className="text-black font-bold text-sm font-mono hover:underline">
                  Explore our products
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mt-6 text-xs font-mono text-gray-500">
            <p>2026 Ezhuthola edTech. All rights reserved.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}