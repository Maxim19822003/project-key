import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { staticContentPlugin } from './src/vite/staticContentPlugin';

export default defineConfig({
  plugins: [react(), staticContentPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
