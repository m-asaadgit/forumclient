import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Default output directory
    sourcemap: true, // Optional: enable sourcemaps for debugging production builds
  },
    server: {
      host: '0.0.0.0',
      port: 5173,
    },
  
});
