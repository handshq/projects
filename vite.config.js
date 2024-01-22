import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'app/javascript',
  build: {
    outDir: '../../dist',
  },
  server: {
    open: true,
  },
}); 
