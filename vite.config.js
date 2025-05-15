import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['425ade0c-7524-4507-a29d-d13d98611805-00-2x8nd5rrb3d8q.pike.replit.dev']
  }
})
