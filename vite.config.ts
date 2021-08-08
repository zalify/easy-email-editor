import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@example/components/Form': path.resolve(__dirname, './src/components/core/Form'),
      '@example': path.resolve('example'),
      '@': path.resolve(__dirname, './src'),
      'easy-email-editor/lib/style.css': path.resolve(__dirname, './src/index.tsx'), // 没有用的，只是防止css 404报错
      'easy-email-editor': path.resolve(__dirname, './src/index.tsx'),
    },
  },
  define: {},
  build: {
    target: 'es2015',
  },
  optimizeDeps: {
    include: []
  },
  css: {
    modules: {
      localsConvention: 'dashes',
    },
    preprocessorOptions: {
      scss: {},
      less: {
        javascriptEnabled: true,
      }
    },

  },
  server: {
    proxy: {
      '/email': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    }
  },
  plugins: [reactRefresh()],
});
