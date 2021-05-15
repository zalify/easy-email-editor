import { defineConfig } from 'vite';
import path from 'path';
import typescript2 from 'rollup-plugin-typescript2';

export default defineConfig({
  plugins: [
    {
      ...typescript2({
        check: false,
        tsconfig: 'tsconfig.lib.json',
      }),
      apply: 'build',
    },
  ],
  resolve: {
    alias: {

      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {

  },
  build: {
    minify: true,
    manifest: true,
    sourcemap: true,
    target: 'es2015',
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'easy-email',
      formats: ['umd'],
    },
    rollupOptions: {
      plugins: [],
      external: [
        'react',
        'react-dom',
        'antd',
        'formik',
        'mjml-browser'
      ],
      output: {
        entryFileNames: 'index.js',
      },
    },
    outDir: 'lib'
  },
  optimizeDeps: {

  },
  css: {
    modules: {
      localsConvention: 'dashes',
    },
    preprocessorOptions: {
      scss: {},
    },
  },
});
