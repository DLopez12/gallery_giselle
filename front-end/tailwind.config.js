/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. Breakpoints (Mobile, Tablet, Desktop)
      screen: {
        'mobile': {'min': '344px', 'max': '882px'}, // Mobile range
        'tablet': {'min': '883px', 'max': '1024px'}, // Tablet range
        'desktop': {'min': '1025px'}, // Desktop and larger
      },
      // 2. Color Palette (Modern oklch() colors)
      colors: {
        brand: {
          primary: "oklch(0.62 0.17 183)",  // Vibrant teal
          secondary: "oklch(0.82 0.12 80)",  // Warm cream
          dark: "oklch(0.15 0.03 260)",     // Deep navy
        },
        // Photo-specific grayscale
        photo: {
          black: "oklch(0.03 0.01 260)",
          white: "oklch(0.98 0.01 100)",
        }
      },

      // 3. Aspect Ratios
      aspectRatio: {
        'photo': '3 / 2',
        'portrait': '2 / 3',
        'square': '1 / 1',
        'panorama': '16 / 9',
      },

      // 4. Animation (Updated with mobile menu animations)
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'zoom-in': 'zoomIn 0.3s ease-out',
        'mobile-fade-in': 'mobileMenuFadeIn 0.3s ease-out forwards',
        'mobile-fade-out': 'mobileMenuFadeOut 0.2s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        // Add these new keyframes:
        mobileMenuFadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        mobileMenuFadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        }
      },

      // 5. Typography
      fontFamily: {
        display: ['"Hanken Grotesk Variable"', 'sans-serif'],
        sans: ['"Hanken Grotesk Variable"', 'sans-serif'],
      },

      // 6. Add transition property for menu (optional but recommended)
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