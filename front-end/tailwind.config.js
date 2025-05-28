/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. Color Palette (Modern oklch() colors)
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

      // 2. Aspect Ratios (Critical for photography)
      aspectRatio: {
        'photo': '3 / 2',       // Standard DSLR ratio
        'portrait': '2 / 3',    // Vertical shots
        'square': '1 / 1',      // Instagram-friendly
        'panorama': '16 / 9',   // Landscape scenes
      },

      // 3. Animation (Smooth gallery transitions)
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'zoom-in': 'zoomIn 0.3s ease-out',
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
      },

      // 4. Typography (Elegant display fonts)
      fontFamily: {
        display: ['"Playfair Display"', 'serif'], // For headings
        sans: ['"Inter"', 'sans-serif'],         // Body text
      },
    },
  },

  // 5. Essential Plugins
  plugins: [
    require('@tailwindcss/aspect-ratio'),    // For image containers
    require('@tailwindcss/typography'),      // For client content areas
    require('tailwindcss-animate'),          // Smooth hover effects
  ],
}