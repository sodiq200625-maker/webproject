import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import siteChrome from '../site-chrome.js';

export default defineConfig({
  plugins: [react(), siteChrome({ crumb: 'Shopping Cart' })],
  base: './',
  build: { outDir: '../../shopping-cart', emptyOutDir: true },
});
