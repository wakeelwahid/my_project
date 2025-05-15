import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['3bc3b14c-693e-4e8b-ae6c-08d770fc5adc-00-25upmz1b6nrkd.pike.replit.dev']
  }
})
