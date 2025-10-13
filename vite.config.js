import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Base path configuration:
// - Use '/' for local development and Vercel
// - Use '/portfolio/' for GitHub Pages (uncomment line below)
export default defineConfig({
  plugins: [react()],
  base: '/', // Change to '/portfolio/' only if deploying to GitHub Pages
  build: {
    outDir: 'dist',
  }
})

