import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Use dynamic import instead of default chunks to enable code splitting
        // based on user login status and admin roles.
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        // Manually configure the chunks to optimize code-sharing
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group all third-party modules into a vendor chunk
            return 'vendor';
          }
          if (id.includes('components/')) {
            // Group components into separate chunks
            return 'components';
          }
          // Return null for all other modules to use the default chunk
          return null;
        },
      },
    },
  },
})
