import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const apiUrl = (process.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '').replace(/\/api$/, '')

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: apiUrl,
        changeOrigin: true,
      }
    }
  }
})
