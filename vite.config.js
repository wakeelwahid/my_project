import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['e75568bf-512a-4c83-8bbb-7156d7044477-00-143rxmela5wse.sisko.replit.dev']
  }
})
