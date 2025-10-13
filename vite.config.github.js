import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// This config is ONLY for GitHub Pages deployment
// Use: vite build --config vite.config.github.js
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/', // GitHub Pages base path
  build: {
    outDir: 'dist',
  }
})


