import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['2c1b45eb-cc47-408e-a8b0-5dc9f0345e26-00-3o4k29s7xdybb.sisko.replit.dev']
  }
})
