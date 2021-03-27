import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@example': path.resolve('example'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {

  },
  build: {
    target: 'es2015'
  },
  optimizeDeps: {
    // include: ['node_modules/insert-css/index.js']
  },
  css: {
    modules: {
      localsConvention: 'dashes',
    },
    preprocessorOptions: {
      scss: {

      }
    },
  },
  server: {

  },
  plugins: [reactRefresh()]
});
