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
      // ... other configs ...
      screens: {
        'mobile': {'min': '344px', 'max': '882px'},
        'tablet': {'min': '883px', 'max': '1024px'},
        'desktop': {'min': '1025px'},
      },
      colors: {
        'gallery-brown': '#3c2415',
        'gallery-neutral': '#e2dbd4',
        'gallery-tan': '#b69675',
        'gallery-blue': '#98b3c5',
        'gallery-tan-light': '#cdb397',
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