'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [activePoint, setActivePoint] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const slidingPoints = [
    {
      title: 'Where Doctors Connect With Opportunities',
      description: 'Find healthcare opportunities that match your skills, location, and preferences in real-time'
    },
    {
      title: 'Real-Time Opportunity Matching',
      description: 'Emergency surgeries, medical camps, leave cover, and permanent roles - all accessible instantly'
    },
    {
      title: 'Smart Location-Based Filtering',
      description: 'Our intelligent system matches you with opportunities based on your qualifications and reachability'
    },
    {
      title: 'Work On Your Terms',
      description: 'Control your availability, set location preferences, and choose opportunities that fit your schedule'
    },
    {
      title: 'Complete Profile Verification',
      description: 'Your qualifications, skills, and experience are verified for maximum trust and credibility'
    },
    {
      title: 'Direct Healthcare Connection',
      description: 'Connect directly with hospitals and clinics. No intermediaries, transparent communication.'
    }
  ];

  const opportunityTypes = [
    {
      name: 'Super Emergency',
      color: 'bg-red-50',
      borderColor: 'border-red-300',
      description: 'Urgent surgeries and critical cases needed within hours. Emergency response opportunities for experienced doctors.'
    },
    {
      name: 'Medical Camp',
      color: 'bg-blue-50',
      borderColor: 'border-blue-300',
      description: 'Health camps and outreach programs. Multi-day opportunities for community healthcare and specialized services.'
    },
    {
      name: 'Leave Cover',
      color: 'bg-orange-50',
      borderColor: 'border-orange-300',
      description: 'Planned leave coverage for permanent staff. 1 week to 3 months assignments for temporary relief positions.'
    },
    {
      name: 'Permanent Role',
      color: 'bg-green-50',
      borderColor: 'border-green-300',
      description: 'Full-time employment opportunities. Join healthcare facilities as permanent staff with benefits and growth.'
    },
    {
      name: 'Specialist Consulting',
      color: 'bg-purple-50',
      borderColor: 'border-purple-300',
      description: 'Specialized consulting and second opinions. Short-term expert consultation for complex medical cases.'
    },
    {
      name: 'Training & Mentoring',
      color: 'bg-amber-50',
      borderColor: 'border-amber-300',
      description: 'Medical education and training roles. Teach, mentor, and share expertise with healthcare facilities and students.'
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePoint((prev) => (prev + 1) % slidingPoints.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slidingPoints.length]);

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
      <Header />

      {/* Add padding to account for fixed header */}
      <div className="pt-20"></div>

      {/* AUTO SLIDING SECTION WITH PARALLAX - REDUCED HEIGHT */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto w-full">
          {/* Sliding Content with Parallax */}
          <div 
            className="h-64 sm:h-72 flex flex-col justify-center items-center transition-transform duration-500"
            style={{ transform: `translateY(${Math.min(scrollY * 0.3, 40)}px)` }}
          >
            <div className="w-full max-w-3xl text-center px-4">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-6">
                {slidingPoints[activePoint].title}
              </h3>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                {slidingPoints[activePoint].description}
              </p>
            </div>

            {/* Indicators */}
            <div className="flex gap-2 mt-8">
              {slidingPoints.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActivePoint(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activePoint
                      ? 'bg-black w-8'
                      : 'bg-gray-400 hover:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OPPORTUNITY TYPES SECTION */}
      <section className="w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-12">Opportunity Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {opportunityTypes.map((opportunity) => (
              <div key={opportunity.name} className={`${opportunity.color} border ${opportunity.borderColor} rounded p-6 hover:shadow-lg transition-shadow`}>
                <h3 className="text-lg sm:text-xl font-bold text-black mb-3">{opportunity.name}</h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{opportunity.description}</p>
              </div>
            ))}
          </div>

          {/* Demo Button */}
          <div className="flex justify-center">
            <Link href="/demo" className="px-8 py-3 text-sm font-mono border-2 border-blue-600 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors font-bold">
              View Demo →
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-12">Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-black mb-2">Email</h3>
              <p className="text-gray-700">flowinsight.app@gmail.com</p>
            </div>
            <div>
              <h3 className="font-bold text-black mb-2">Phone</h3>
              <p className="text-gray-700">+91 7034484222</p>
            </div>
            <div>
              <h3 className="font-bold text-black mb-2">Address</h3>
              <p className="text-gray-700">KP 17/4A, PO Koodali, Kannur, Kerala - 670592</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
