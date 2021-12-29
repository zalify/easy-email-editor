import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, './src'),
    },
  },
  define: {},
  build: {
    emptyOutDir: false,
    minify: true,
    manifest: false,
    sourcemap: true,
    target: 'es2015',
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'easy-email-core',
      formats: ['es', 'cjs'],
      fileName: (mod) => `index.${mod}.js`,
    },
    rollupOptions: {
      plugins: [],
      external: [
        'react',
        'react-dom',
        'react-dom/server',
        'mjml-browser',
        'lodash',
      ],
      output: {},
    },
    outDir: 'lib',
  },
  optimizeDeps: {
    include: [],
  },
});
