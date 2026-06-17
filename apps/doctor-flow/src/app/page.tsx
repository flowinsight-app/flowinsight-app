'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [activePoint, setActivePoint] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const slidingPoints = [
    {
      title: 'Healthcare At Your Fingertips',
      description: 'Find doctors, book appointments, get emergency care - all in one place',
      icon: '⚕️'
    },
    {
      title: 'Connect With Verified Doctors',
      description: 'Browse qualified healthcare professionals with verified credentials and real patient ratings',
      icon: '👨‍⚕️'
    },
    {
      title: 'Emergency Medical Support',
      description: 'Get urgent medical help when you need it most - find available doctors instantly',
      icon: '🚑'
    },
    {
      title: 'For Hospitals & Clinics',
      description: 'Post requirements, find verified doctors, and manage emergencies seamlessly',
      icon: '🏥'
    },
    {
      title: 'For Doctors',
      description: 'Grow your practice, find flexible opportunities and manage appointments efficiently',
      icon: '💼'
    },
    {
      title: 'One Platform, Endless Possibilities',
      description: 'Where patients, doctors, and healthcare facilities connect and thrive together',
      icon: '🌍'
    }
  ];

  const userTypes = [
    {
      title: 'I\'m a Patient',
      description: 'Search & book appointments with verified doctors',
      icon: '👤',
      color: 'bg-blue-50',
      borderColor: 'border-blue-300',
      href: '/login?type=patient',
      features: ['Find nearby doctors', 'Book appointments', 'Video consultations', 'View ratings & reviews']
    },
    {
      title: 'I\'m a Doctor',
      description: 'Manage appointments and find opportunities',
      icon: '👨‍⚕️',
      color: 'bg-green-50',
      borderColor: 'border-green-300',
      href: '/login?type=doctor',
      features: ['Manage availability', 'View appointments', 'Emergency opportunities', 'Build your profile']
    },
    {
      title: 'I\'m a Clinic/Hospital',
      description: 'Post requirements and find verified doctors',
      icon: '🏥',
      color: 'bg-red-50',
      borderColor: 'border-red-300',
      href: '/login?type=hospital',
      features: ['Post requirements', 'Find qualified doctors', 'Manage emergencies', 'View applications']
    }
  ];

  const features = [
    {
      icon: '🔍',
      title: 'Smart Search & Filter',
      description: 'Find doctors by specialty, location, availability, and ratings'
    },
    {
      icon: '⭐',
      title: 'Verified Credentials',
      description: 'All doctors verified with authentic qualifications and experience'
    },
    {
      icon: '📅',
      title: 'Easy Booking',
      description: 'Book appointments in seconds with real-time availability'
    },
    {
      icon: '💬',
      title: 'Direct Communication',
      description: 'Connect directly with doctors and healthcare facilities'
    },
    {
      icon: '🚨',
      title: 'Emergency Support',
      description: 'Get urgent medical help and emergency doctor connections'
    },
    {
      icon: '📊',
      title: 'Real-Time Management',
      description: 'Track appointments, requirements, and applications instantly'
    }
  ];

  const stats = [
    { number: '5000+', label: 'Verified Doctors' },
    { number: '1000+', label: 'Hospitals & Clinics' },
    { number: '50K+', label: 'Happy Patients' },
    { number: '24/7', label: 'Emergency Support' }
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePoint((prev) => (prev + 1) % slidingPoints.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full bg-white text-black font-mono">
      {/* HEADER - FIXED */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-3xl">⚕️</span>
            <div>
              <div className="text-xl font-bold text-black tracking-tight">DOCTOR FLOW</div>
              <div className="text-xs text-gray-600">Healthcare Marketplace</div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden sm:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-700 hover:text-black transition">Features</a>
            <a href="#about" className="text-sm text-gray-700 hover:text-black transition">About</a>
            <Link href="/login" className="px-4 py-2 text-sm border-2 border-blue-600 text-blue-700 rounded hover:bg-blue-50 transition font-bold">
              Login
            </Link>
          </nav>

          {/* Mobile Menu */}
          <div className="sm:hidden">
            <Link href="/login" className="text-sm border-2 border-blue-600 text-blue-700 px-3 py-1 rounded hover:bg-blue-50 transition font-bold">
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Add padding for fixed header */}
      <div className="pt-20"></div>

      {/* HERO SECTION - AUTO SLIDING WITH PARALLAX */}
      <section className="w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto w-full">
          <div 
            className="h-64 sm:h-72 flex flex-col justify-center items-center transition-transform duration-500"
            style={{ transform: `translateY(${Math.min(scrollY * 0.3, 40)}px)` }}
          >
            <div className="w-full max-w-3xl text-center px-4">
              {/* Large Icon */}
              <div className="text-6xl sm:text-7xl mb-6">{slidingPoints[activePoint].icon}</div>
              
              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-600 mb-6 leading-tight">
                {slidingPoints[activePoint].title}
              </h1>
              
              {/* Description */}
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8">
                {slidingPoints[activePoint].description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup?type=patient" className="px-8 py-3 text-sm font-bold border-2 border-blue-600 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Get Started
                </Link>
                <Link href="#about" className="px-8 py-3 text-sm font-bold border-2 border-gray-300 bg-white text-black rounded hover:bg-gray-50 transition">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex gap-2 mt-12">
              {slidingPoints.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActivePoint(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activePoint
                      ? 'bg-black w-8'
                      : 'bg-gray-400 hover:bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* USER TYPE SELECTOR SECTION */}
      <section className="w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black text-center mb-4">Who Are You?</h2>
          <p className="text-center text-gray-700 mb-16 max-w-2xl mx-auto">
            Choose your role to get started with Doctor Flow
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userTypes.map((userType) => (
              <div
                key={userType.title}
                className={`${userType.color} border-2 ${userType.borderColor} rounded p-8 hover:shadow-lg transition flex flex-col h-full`}
              >
                {/* Icon */}
                <div className="text-5xl mb-4">{userType.icon}</div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-black mb-2">{userType.title}</h3>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-6 flex-grow">{userType.description}</p>

                {/* Features List */}
                <ul className="space-y-2 mb-8">
                  {userType.features.map((feature, idx) => (
                    <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href={userType.href}
                  className="w-full px-6 py-3 text-sm font-bold border-2 border-gray-800 bg-white text-black rounded hover:bg-gray-100 transition text-center"
                >
                  Login / Sign Up →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black text-center mb-4">Why Choose Doctor Flow?</h2>
          <p className="text-center text-gray-700 mb-16 max-w-2xl mx-auto">
            Everything you need for better healthcare management
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="border-2 border-gray-300 rounded p-8 hover:shadow-lg transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-black mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black text-center mb-16">Trusted By Thousands</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="border-2 border-gray-300 rounded p-8 text-center hover:shadow-lg transition">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <p className="text-sm text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-8">About Doctor Flow</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Doctor Flow is a modern healthcare marketplace that connects patients, doctors, and healthcare facilities seamlessly. Our platform bridges the gap between those seeking healthcare and those providing it.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Whether you're looking for a doctor, managing a clinic, or seeking emergency medical support, Doctor Flow makes healthcare accessible, affordable, and efficient.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Built with cutting-edge technology and a commitment to healthcare excellence, Doctor Flow is part of the Flow Insight ecosystem - transforming how businesses operate with real-time intelligence.
              </p>
            </div>

            <div className="border-2 border-gray-300 rounded p-8 bg-gray-50">
              <h3 className="font-bold text-lg mb-4">Key Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-lg">✓</span>
                  <div>
                    <p className="font-bold text-sm">Verified Healthcare Professionals</p>
                    <p className="text-xs text-gray-600">All doctors verified with authentic credentials</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-lg">✓</span>
                  <div>
                    <p className="font-bold text-sm">24/7 Emergency Support</p>
                    <p className="text-xs text-gray-600">Get urgent medical help anytime, anywhere</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-lg">✓</span>
                  <div>
                    <p className="font-bold text-sm">Easy Appointment Management</p>
                    <p className="text-xs text-gray-600">Book and manage appointments in seconds</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-lg">✓</span>
                  <div>
                    <p className="font-bold text-sm">Hospital-Doctor Integration</p>
                    <p className="text-xs text-gray-600">Seamless requirement posting and matching</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-blue-50 border-b border-blue-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">Ready to Get Started?</h2>
          <p className="text-gray-700 text-lg mb-8">Join thousands of patients, doctors, and healthcare facilities on Doctor Flow</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?type=patient" className="px-8 py-4 text-sm font-bold bg-blue-600 text-white rounded hover:bg-blue-700 transition border-2 border-blue-600">
              Sign Up as Patient
            </Link>
            <Link href="/signup?type=doctor" className="px-8 py-4 text-sm font-bold bg-green-600 text-white rounded hover:bg-green-700 transition border-2 border-green-600">
              Sign Up as Doctor
            </Link>
            <Link href="/signup?type=hospital" className="px-8 py-4 text-sm font-bold bg-red-600 text-white rounded hover:bg-red-700 transition border-2 border-red-600">
              Sign Up as Hospital
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-white border-t border-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-12">
            {/* Column 1: Logo */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">⚕️</span>
                <div>
                  <div className="font-bold text-black">DOCTOR FLOW</div>
                  <div className="text-xs text-gray-600">Healthcare Marketplace</div>
                </div>
              </div>
              <p className="text-sm text-gray-700">Connecting patients, doctors, and healthcare facilities</p>
            </div>

            {/* Column 2: For Patients */}
            <div>
              <h3 className="font-bold text-black mb-4 text-sm">For Patients</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-700 hover:text-black transition">Find Doctors</a></li>
                <li><a href="#" className="text-sm text-gray-700 hover:text-black transition">Book Appointment</a></li>
                <li><a href="#" className="text-sm text-gray-700 hover:text-black transition">Emergency Services</a></li>
                <li><a href="#" className="text-sm text-gray-700 hover:text-black transition">View Ratings</a></li>
              </ul>
            </div>

            {/* Column 3: For Doctors */}
            <div>
              <h3 className="font-bold text-black mb-4 text-sm">For Doctors</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-700 hover:text-black transition">Manage Profile</a></li>
                <li><a href="#" className="text-sm text-gray-700 hover:text-black transition">View Appointments</a></li>
                <li><a href="#" className="text-sm text-gray-700 hover:text-black transition">Find Opportunities</a></li>
                <li><a href="#" className="text-sm text-gray-700 hover:text-black transition">Earnings</a></li>
              </ul>
            </div>

            {/* Column 4: For Hospitals */}
            <div>
              <h3 className="font-bold text-black mb-4 text-sm">For Hospitals</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-700 hover:text-black transition">Post Requirements</a></li>
                <li><a href="#" className="text-sm text-gray-700 hover:text-black transition">Find Doctors</a></li>
                <li><a href="#" className="text-sm text-gray-700 hover:text-black transition">Manage Staff</a></li>
                <li><a href="#" className="text-sm text-gray-700 hover:text-black transition">Analytics</a></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="font-bold text-black mb-3 text-sm">Contact Us</h4>
                <p className="text-sm text-gray-700">Email: flowinsight.app@gmail.com</p>
                <p className="text-sm text-gray-700">Phone: +91 7034484222</p>
              </div>
              <div>
                <h4 className="font-bold text-black mb-3 text-sm">Address</h4>
                <p className="text-sm text-gray-700">KP 17/4A, PO Koodali</p>
                <p className="text-sm text-gray-700">Kannur, Kerala - 670592</p>
              </div>
              <div>
                <h4 className="font-bold text-black mb-3 text-sm">Part of Flow Insight</h4>
                <p className="text-sm text-gray-700">Doctor Flow is a sub-module of Flow Insight ERP Platform</p>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-300 pt-8 text-center">
              <p className="text-xs text-gray-600">
                © 2026 Doctor Flow. All rights reserved. | Operated by Ezhuthola edTech Private Limited
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}