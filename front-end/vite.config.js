import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
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
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      '@fontsource-variable/hanken-grotesk',
    ],
  },
  plugins: [
  react(),
  tailwindcss(), // Add Tailwind CSS plugin
  viteCompression({ // Add the compression plugin here
    verbose: true, // Output compression info to console
    disable: false, // Enable compression
    deleteOriginFile: false, // Keep original files
    threshold: 10240, // Compress files larger than 10KB
    algorithm: 'gzip', // Use gzip compression
    ext: '.gz', // Outputfiles with .gz extension
  }),
  viteCompression({
    verbose: true,
    disable: false,
    deleteOriginFile: false,
    threshold: 10240,
    algorithm: 'brotliCompress', // Use Brotli compression
    ext: '.br', // Output files with .br extension
  }),
],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash].[ext]',
        chuckFileNames: 'chunks/[name].[hash].js',
        entryFileNames: 'entries/[name].[hash].js'
      },
    },
    assetsInclude: ['**/*.heic', '**/*.arw',],
  }
});
