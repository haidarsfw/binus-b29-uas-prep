import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - split heavy dependencies
          'vendor-react': ['react', 'react-dom'],
          'vendor-firebase': ['firebase/app', 'firebase/database', 'firebase/storage'],
          'vendor-animation': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    // App is large but well-organized - suppress warning
    chunkSizeWarningLimit: 700,
  },
})
