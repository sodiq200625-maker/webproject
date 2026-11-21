import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import siteChrome from '../site-chrome.js';

export default defineConfig({
  plugins: [react(), siteChrome({ crumb: 'Class practice' })],
  base: './',
  build: { outDir: '../../practice', emptyOutDir: true },
});
