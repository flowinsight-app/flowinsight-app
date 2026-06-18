/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors (Google v4.0)
        'brand-navy': '#1A237E',      // Deep Navy - headings, primary CTA
        'brand-blue': '#2563EB',       // Bright Blue - secondary elements
        'brand-green': '#059669',      // Forest Green - success states
        'brand-orange': '#EA580C',     // Warm Orange - warnings
        'brand-purple': '#7C3AED',     // Vibrant Purple - premium features
        'brand-red': '#F43F5E',        // Coral Red - errors
        
        // Neutral Colors
        'text-primary': '#1F2937',     // Charcoal Gray - main text
        'text-secondary': '#6B7280',   // Cool Gray - secondary text
        'bg-light': '#F3F4F6',         // Light Gray - card backgrounds
        'bg-lighter': '#F9FAFB',       // Off-White - page background
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'h1': ['48px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h2': ['36px', { lineHeight: '1.25', fontWeight: '600', letterSpacing: '-0.01em' }],
        'h3': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'tiny': ['13px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '48px',
        '4xl': '64px',
      },
      borderRadius: {
        'none': '0',
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 24px rgba(0, 0, 0, 0.15)',
        'brand-navy': '0 2px 8px rgba(26, 35, 126, 0.15)',
        'brand-purple': '0 4px 12px rgba(124, 58, 237, 0.2)',
      },
    },
  },
  plugins: [],
};