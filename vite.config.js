import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'app/assets/builds',
    emptyOutDir: false,
    rollupOptions: {
      input: 'app/javascript/index.jsx',
      output: {
        entryFileNames: 'application.js',
        assetFileNames: (info) => info.name.endsWith('.css') ? 'application.css' : '[name][extname]',
      },
    },
  },
});
