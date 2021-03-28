import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'path': path.resolve(__dirname, 'browser-mocks/path'),
      'fs': path.resolve(__dirname, 'browser-mocks/fs'),
      'uglify-js': path.resolve(__dirname, 'browser-mocks/uglify-js'),
      '@example': path.resolve('example'),
      '@': path.resolve(__dirname, './src'),

    },
  },
  define: {
    // process: {

    // },
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
