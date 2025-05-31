import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    proxy: {
      '/avc': {
        target: 'http://localhost:1337/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/avc/, ''),
      }
    }
  },
  build: {
    rollupOptoins: {
      output: {
        assetFileNames: 'assets/[name]-[hash].[ext]',
        chuckFileNames: 'chunks/[name].[hash].js',
        entryFileNames: 'entries/[name].[hash].js'
      }
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
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
