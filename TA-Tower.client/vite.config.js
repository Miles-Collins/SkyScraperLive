import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "../TA-Tower/client",
    emptyOutDir: true,
    sourcemap: false,
  },
  server: {
    port: 8080,
  },
});
