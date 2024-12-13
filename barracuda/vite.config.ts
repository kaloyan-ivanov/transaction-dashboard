import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import checker from "vite-plugin-checker";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    checker({ typescript: true }),
  ],
  server: {
    port: 3000,
  },
  build: {
    outDir: "build",
    cssCodeSplit: false,
    sourceMap: true,
  },
  preview: {
    port: 3000,
  },
});
