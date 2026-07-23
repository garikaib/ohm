import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'wp-content/themes/ohm/src/main.jsx'),
      name: 'OhmTheme',
    },
    outDir: 'wp-content/themes/ohm/dist',
    rollupOptions: {
      external: [],
      output: [
        {
          format: 'es',
          entryFileNames: 'ohm-theme.es.js',
          chunkFileNames: '[name]-[hash].js',
          assetFileNames: (assetInfo) => (assetInfo.name && assetInfo.name.endsWith('.css') ? 'ohm.css' : '[name]-[hash][extname]'),
        },
      ],
    },
  },
});
