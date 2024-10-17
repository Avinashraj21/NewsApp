import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// https://newsapp-dohg.onrender.com/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://newsapp-dohg.onrender.com/',
    },
  },
  plugins: [react()],
})
