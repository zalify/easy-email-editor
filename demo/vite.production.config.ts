import { defineConfig } from 'vite';
import styleImport from 'vite-plugin-style-import';
import path from 'path';
import { injectHtml } from 'vite-plugin-html';

export default defineConfig({
  resolve: {
    alias: {
      '@demo': path.resolve(__dirname, './src'),
      react: path.resolve('./node_modules/react'),
      'react-final-form': path.resolve(
        __dirname,
        './node_modules/react-final-form'
      ),
      'easy-email-core': path.resolve('../packages/easy-email-core'),
      'easy-email-editor': path.resolve('../packages/easy-email-editor'),
      'easy-email-extensions': path.resolve(
        '../packages/easy-email-extensions'
      ),
    },
  },
  optimizeDeps: {},
  define: {},
  build: {
    minify: true,
    manifest: true,
    sourcemap: true,
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/\/node_modules\/html2canvas\/.*/.test(id)) {
            return 'html2canvas';
          }
          if (/\/node_modules\/lodash\/.*/.test(id)) {
            return 'lodash';
          }
          if (/\/node_modules\/mjml-browser\/.*/.test(id)) {
            return 'mjml-browser';
          }
        },
      },
    },
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
  plugins: [
    styleImport({
      libs: [
        // Dynamic import @arco-design styles
        {
          libraryName: '@arco-design/web-react',
          libraryNameChangeCase: 'pascalCase',
          esModule: true,
          resolveStyle: (name) =>
            `@arco-design/web-react/es/${name}/style/index`,
        },
        {
          libraryName: '@arco-design/web-react/icon',
          libraryNameChangeCase: 'pascalCase',
          resolveStyle: (name) =>
            `@arco-design/web-react/icon/react-icon/${name}`,
          resolveComponent: (name) =>
            `@arco-design/web-react/icon/react-icon/${name}`,
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

        `
            : '',
      },
    }),
  ].filter(Boolean),
});
