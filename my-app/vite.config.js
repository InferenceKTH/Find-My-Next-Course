import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),
            tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',  // Allow external access
    port: 5173,        // Ensure the port is 5173 (or change if needed)
  }
})
