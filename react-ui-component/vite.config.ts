import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/container': {
        target: 'http://localhost:3000/container',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/container/, ''),
      },
    },
  },
});
