import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// `base` is set from an env var so the same config works for:
//  - local dev / Vercel (base "/")
//  - GitHub Pages, which serves the site from /<repo-name>/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
});
