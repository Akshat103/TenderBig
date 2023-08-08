import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Use dynamic import instead of default chunks to enable code splitting
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        // Manually configure the chunks to optimize code-sharing
        manualChunks: undefined,
      },
    },
  },
})
