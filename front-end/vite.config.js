import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      'tailwindcss',
      '@fontsource-variable/hanken-grotesk',
    ],
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  assetsInclude: ['**/*.heic', '**/*.arw',],
})
