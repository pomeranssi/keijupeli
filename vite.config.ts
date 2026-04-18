import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const serverTarget = 'http://localhost:3200';

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  server: {
    port: 3000,
    proxy: {
      '/api': serverTarget,
      '/images/items': serverTarget,
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
});
