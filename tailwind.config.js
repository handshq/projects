/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/javascript/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3574D6', // HandsHQ blue
        },
        green: {
          DEFAULT: '#24A47F',
        },
        orange: {
          DEFAULT: '#FFA52E',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
}
