import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['14c16be2-e191-4df2-bf23-f8f49f0a06b8-00-3as3q063na8as.pike.repl.co']
  }
})
