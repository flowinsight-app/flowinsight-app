'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Real-Time Opportunities',
    description: 'Receive instant job notifications from verified healthcare facilities nearby. Accept assignments that match your skills and availability.',
    icon: '🏥',
    color: 'from-blue-50 to-blue-100',
  },
  {
    id: 2,
    title: 'Flexible Schedule',
    description: 'Work when you want. Choose from available shifts that fit your schedule. No commitments, pure flexibility.',
    icon: '⏰',
    color: 'from-green-50 to-green-100',
  },
  {
    id: 3,
    title: 'Verified Facilities',
    description: 'All healthcare facilities are verified and trusted. Work with hospitals, clinics, and medical centers you can rely on.',
    icon: '✅',
    color: 'from-emerald-50 to-emerald-100',
  },
  {
    id: 4,
    title: 'Competitive Earnings',
    description: 'Earn competitive rates for every assignment. Transparent pricing with instant payment settlements.',
    icon: '💰',
    color: 'from-yellow-50 to-yellow-100',
  },
  {
    id: 5,
    title: 'Join Thousands',
    description: 'Be part of a growing community of healthcare professionals. Connect, collaborate, and grow your career.',
    icon: '👥',
    color: 'from-purple-50 to-purple-100',
  },
];

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-rotate slides
  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Slider Container */}
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Slides */}
          <div className="relative h-96 sm:h-80 lg:h-96">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className={`h-full bg-gradient-to-br ${slide.color} flex flex-col items-center justify-center p-8 text-center`}>
                  {/* Icon */}
                  <div className="text-6xl mb-6 transform transition-transform duration-300 hover:scale-110">
                    {slide.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-4">
                    {slide.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-text-primary max-w-md leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 shadow-md"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-brand-navy" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 shadow-md"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-brand-navy" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? 'bg-brand-navy w-8 h-3'
                    : 'bg-gray-300 hover:bg-gray-400 w-3 h-3'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-6 text-sm text-text-secondary font-medium">
          {currentSlide + 1} / {slides.length}
        </div>

        {/* Auto-play Toggle */}
        <div className="text-center mt-4">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="text-sm text-brand-blue hover:text-brand-navy transition-colors"
          >
            {isAutoPlay ? '⏸ Auto-play' : '▶ Resume auto-play'}
          </button>
        </div>
      </div>
    </div>
  );
}