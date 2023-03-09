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
        'lodash',
        // Let uuid library handle how to use its crypto module depending on the environment
        // Otherwise, uuid will be bundled into a specific environment (here it would expect to be in a browser environment)
        // and any project importing easy-email-core in a node environment would fail with a missing 'crypto' module error
        'uuid'
      ],
      output: {},
    },
    outDir: 'lib',
  },
  optimizeDeps: {
    include: [],
  },
});
