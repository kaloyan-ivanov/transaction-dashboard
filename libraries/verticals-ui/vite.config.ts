import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';
import svgrPlugin from 'vite-plugin-svgr';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    libInjectCss(),

    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./{src,test}/**/*.{js,jsx,ts,tsx}"',
        dev: {
          overrideConfig: {}
        }
      }
    }),
    dts() // to bundle types
  ],
  server: {
    fs: {
      allow: ['../../..'] // allow serving files from common/temp/node_modules/.pnpm
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'umd'],
      name: 'VerticalsUI',
      fileName: 'verticals-ui'
    },
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      // these libraries shall not be part of the bundle
      external: ['react', 'react-dom', 'react/jsx-runtime']
    }
  }
});
