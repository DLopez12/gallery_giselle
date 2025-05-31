/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit', // Enable Just-In-Time mode for faster builds
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'header': 'padding, margin',
      },
      // 1. Breakpoints (Mobile, Tablet, Desktop)
      screens: {
        'mobile': {'min': '344px', 'max': '882px'}, // Mobile range
        'tablet': {'min': '883px', 'max': '1024px'}, // Tablet range
        'desktop': {'min': '1025px'}, // Desktop and larger
      },
      // 2. Color Palette 
      colors: {
        brand: {
          primary: "#00a6a6",  // Vibrant teal
          secondary: "#f0e6d2",  // Warm cream
          dark: "#0a0a23",     // Deep navy
        },
        // Photo-specific grayscale
        photo: {
          black: "#000000", // Pure black
          white: "#fafafa", // Off-white
        }
      },

      // 3. Aspect Ratios
      aspectRatio: {
        'photo': '3 / 2',
        'portrait': '2 / 3',
        'square': '1 / 1',
        'panorama': '16 / 9',
      },

      // 4. Typography
      fontFamily: {
        display: ['"Hanken Grotesk Variable"', 'sans-serif'],
        sans: ['"Hanken Grotesk Variable"', 'sans-serif'],
      },

      // 5. Add transition property for menu (optional but recommended)
      transitionProperty: {
        'menu': 'opacity, transform' // Enables smooth transitions for both properties
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}