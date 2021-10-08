import { defineConfig } from 'vite';
import path from 'path';
import typescript2 from 'rollup-plugin-typescript2';
import visualizer from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    {
      ...typescript2({
        check: false,
        tsconfig: 'tsconfig.lib.json',
      }),
      apply: 'build',
    },
    process.env.ANALYZE === 'true' &&
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean) as any,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {},
  build: {
    minify: true,
    manifest: true,
    sourcemap: true,
    target: 'es2015',
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'easy-email',
      formats: ['es'],
    },
    rollupOptions: {
      plugins: [],
      external: [
        'react',
        'react-dom',
        'react-dom/server',
        'antd',
        'mjml-browser',
        'react-final-form',
        'lodash',
      ],
      output: {
        entryFileNames: 'index.js',
      },
    },
    outDir: 'lib',
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
    },
  },
});
