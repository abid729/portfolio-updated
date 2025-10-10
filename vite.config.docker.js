import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Docker production build configuration
// Docker production build کی configuration
export default defineConfig({
  plugins: [react()],
  base: '/', // Root path for Docker deployment
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild', // Use esbuild (faster and included by default)
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'icons': ['react-icons'],
          'scroll': ['react-scroll']
        }
      }
    }
  },
  server: {
    host: true,
    port: 5173
  }
})

