'use client';

import Link from 'next/link';
import Slider from '@/components/Slider';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-lighter flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="container-custom py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-brand-navy rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">DF</span>
            </div>
            <h1 className="text-xl font-bold text-brand-navy">Doctor Flow</h1>
          </div>

          {/* Empty space - removed auth buttons */}
          <div />
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
              <span className="text-5xl sm:text-6xl">🏥</span>
            </div>
          </div>

          {/* Hero Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-navy mb-4 leading-tight">
            Connect with Healthcare Facilities
            <span className="text-brand-blue block mt-2">in Real-Time</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto">
            Accept medical assignments instantly, work on your schedule, and earn competitive rates. Join thousands of healthcare professionals on Doctor Flow.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/signup">
              <button className="btn-primary w-full sm:w-auto px-8">
                Get Started Now
              </button>
            </Link>
          </div>

          {/* Already registered text */}
          <p className="text-text-secondary mb-12">
            Already a registered doctor?{' '}
            <Link href="/login" className="text-brand-blue hover:text-brand-navy font-semibold transition-colors">
              Login here
            </Link>
          </p>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 mb-12 text-center">
            <div>
              <div className="text-3xl font-bold text-brand-navy">500+</div>
              <p className="text-sm text-text-secondary">Verified Facilities</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-navy">2K+</div>
              <p className="text-sm text-text-secondary">Active Doctors</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-navy">10K+</div>
              <p className="text-sm text-text-secondary">Assignments Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <Slider />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-sm text-gray-400">
            © 2026 Doctor Flow by Ezhuthola edTech. All rights reserved.
          </p>

          {/* Social Media Icons */}
          <div className="flex gap-6">
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors text-lg"
              aria-label="Twitter"
            >
              𝕏
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors text-lg"
              aria-label="LinkedIn"
            >
              in
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors text-lg"
              aria-label="Facebook"
            >
              f
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}