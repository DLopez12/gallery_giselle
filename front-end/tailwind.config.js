// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Merged transitionProperty
      transitionProperty: {
        'header': 'padding, margin',
        'menu': 'opacity, transform', // Now both are included
      },
      // Keyframes for fade-in-scale animation
      keyframes: {
        "fade-in-scale": {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transfrom: 'scale(1)' },
        },
      },
      // Animation for fade-in-scale
      animation: {
        "fade-in-scale": "fade-in-scale 0.2s ease-out forwards",
      },
      // ... other configs ...
      screens: {
        'mobile': {'min': '344px', 'max': '882px'},
        'tablet': {'min': '883px', 'max': '1024px'},
        'desktop': {'min': '1025px'},
      },
      aspectRatio: {
        'photo': '3 / 2',
        'portrait': '2 / 3',
        'square': '1 / 1',
        'panorama': '16 / 9',
      },
      fontFamily: {
        display: ['"Hanken Grotesk Variable"', 'sans-serif'],
        sans: ['"Hanken Grotesk Variable"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}