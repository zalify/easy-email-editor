import { defineConfig } from 'vite';
import path from 'path';

import baseConfig from './vite.config';

export default defineConfig({
  ...baseConfig,
  resolve: {
    alias: {
      '@example': path.resolve('example'),
      'easy-email-editor/lib/style.css': path.resolve(__dirname, './lib/style.css'),
      'easy-email-editor': path.resolve(__dirname, './lib'),
    },
  },
  optimizeDeps: {
    include: ['easy-email-editor', 'antd']
  },
});
