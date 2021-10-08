import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import styleImport from 'vite-plugin-style-import';
import { injectHtml } from 'vite-plugin-html';
import visualizer from 'rollup-plugin-visualizer';

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
    process.env.ANALYZE === 'true' &&
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
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
    injectHtml({
      data: {
        analysis:
          process.env.NODE_ENV !== 'development'
            ? `
        <script type="text/javascript">
        (function (c, l, a, r, i, t, y) {
          c[a] =
            c[a] ||
            function () {
              (c[a].q = c[a].q || []).push(arguments);
            };
          t = l.createElement(r);
          t.async = 1;
          t.src = 'https://www.clarity.ms/tag/' + i;
          y = l.getElementsByTagName(r)[0];
          y.parentNode.insertBefore(t, y);
        })(window, document, 'clarity', 'script', '85gnvzh5py');
      </script>
      <style>
        a[title='站长统计'] {
          visibility: hidden;
          display: none !important;
        }
      </style>
      <script
        type="text/javascript"
        src="https://s9.cnzz.com/z_stat.php?id=1280025969&web_id=1280025969"
      ></script>
      <script src="https://buttons.github.io/buttons.js"></script>
        `
            : '',
      },
    }),
  ].filter(Boolean),
});
