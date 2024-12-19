import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./{src,test}/**/*.{js,jsx,ts,tsx}"',
        dev: {
          overrideConfig: {}
        }
      }
    })
  ],
  server: {
    //https://vitejs.dev/config/server-options.html#server-host
    host: true,
    port: 3000,
    fs: {
      allow: ['../..'] // allow serving files from common/temp/node_modules/.pnpm
    }
  },
  preview: {
    port: 3000
  }
}));
