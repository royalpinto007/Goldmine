import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        free: resolve(__dirname, "free/index.html"),
        fullPack: resolve(__dirname, "full-pack/index.html"),
      },
    },
  },
});
