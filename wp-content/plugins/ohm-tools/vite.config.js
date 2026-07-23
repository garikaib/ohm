import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5174,
    strictPort: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/admin/main.jsx'),
      name: 'OhmTools',
      formats: ['es'],
    },
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      output: {
        entryFileNames: 'ohm-tools.js',
        assetFileNames: (assetInfo) => (assetInfo.name && assetInfo.name.endsWith('.css') ? 'ohm-tools.css' : '[name]-[hash][extname]'),
      },
    },
  },
});
