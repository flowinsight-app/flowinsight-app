import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Courier New', 'monospace'],
      },
      colors: {
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          300: '#d1d5db',
          600: '#4b5563',
          700: '#374151',
        },
        blue: {
          50: '#eff6ff',
          300: '#93c5fd',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        green: {
          50: '#f0fdf4',
          300: '#86efac',
          600: '#16a34a',
          700: '#15803d',
        },
        red: {
          50: '#fef2f2',
          300: '#fca5a5',
          600: '#dc2626',
          700: '#b91c1c',
        },
        orange: {
          50: '#fff7ed',
          300: '#fdba74',
          600: '#ea580c',
        },
        purple: {
          50: '#faf5ff',
          300: '#d8b4fe',
          600: '#9333ea',
        },
        yellow: {
          50: '#fefce8',
          300: '#fde047',
          400: '#facc15',
        },
        amber: {
          50: '#fffbeb',
          300: '#fcd34d',
          600: '#d97706',
        },
      },
    },
  },
  plugins: [],
}
export default config