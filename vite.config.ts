import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import styleImport from 'vite-plugin-style-import';

export default defineConfig({
  resolve: {
    alias: {
      '@example': path.resolve('example'),
      '@': path.resolve(__dirname, './src'),
      'easy-email-editor/lib/style.css': path.resolve(
        __dirname,
        './src/index.tsx'
      ), // 没有用的，只是防止css 404报错
      'easy-email-editor': path.resolve(__dirname, './src/index.tsx'),
    },
  },
  define: {},
  build: {
    minify: true,
    manifest: true,
    sourcemap: true,
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/\/node_modules\/antd\/.*\.js/.test(id)) {
            return 'antd';
          }
          if (/\/node_modules\/html2canvas\/.*/.test(id)) {
            return 'html2canvas';
          }
          if (/\/node_modules\/lodash\/.*/.test(id)) {
            return 'lodash';
          }
          if (/\/node_modules\/mjml-browser\/.*/.test(id)) {
            return 'mjml-browser';
          }
          if (/^\/src\/.*/.test(id)) {
            return 'easy-email-editor';
          }
          if (/^\/example\/.*/.test(id)) {
            return 'demo';
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: [],
  },
  css: {
    modules: {
      localsConvention: 'dashes',
    },
    preprocessorOptions: {
      scss: {},
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    proxy: {
      '/email': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    reactRefresh(),
    styleImport({
      libs: [
        // Dynamic import antd styles
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => `antd/es/${name}/style/index`,
        },
      ],
    }),
  ],
});
