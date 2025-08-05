/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      spacing: {
        '15': '3.75rem',
      },
      colors: {
        // Add custom colors that match your space theme
        'space-blue': {
          50: '#e6f3ff',
          100: '#b3d9ff',
          200: '#80bfff',
          300: '#4da6ff',
          400: '#1a8cff',
          500: '#0073e6',
          600: '#005cb3',
          700: '#004580',
          800: '#002e4d',
          900: '#00171a'
        },
        'cosmic-purple': {
          50: '#f3e6ff',
          100: '#d9b3ff',
          200: '#bf80ff',
          300: '#a64dff',
          400: '#8c1aff',
          500: '#7300e6',
          600: '#5c00b3',
          700: '#450080',
          800: '#2e004d',
          900: '#17001a'
        }
      },
      backgroundImage: {
        'gradient-space': 'linear-gradient(to top, #0d1b2a, #1b263b)',
        'gradient-cosmic': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in',
        'fade-in-up': 'fadeInUp 1s ease 0.5s forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
