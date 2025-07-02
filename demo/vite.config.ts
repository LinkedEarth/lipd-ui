import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    'process.env': {}
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'zustand', 
      'mapbox-gl',
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
      '@mui/system',
      '@mui/styled-engine'
    ]
  },
  resolve: {
    dedupe: [
      'react',
      'react-dom',
      '@emotion/react',
      '@emotion/styled',
      '@mui/material',
      '@mui/system',
      '@mui/styled-engine'
    ]
  },
  css: {
    preprocessorOptions: {
      css: {
        charset: false
      }
    }
  },
  server: {
    port: 3001
  }
}) 