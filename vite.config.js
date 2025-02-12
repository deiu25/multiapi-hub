import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/ro': {
        target: 'https://tenders.guru',
        changeOrigin: true,
        // Rewrite nu este necesar dacă vrei să păstrezi exact calea:
        // rewrite: path => path.replace(/^\/api\/ro/, '/api/ro'),
      },
    },
  },
})
