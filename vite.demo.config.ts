import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

export default defineConfig({
  plugins: [react()],
  root: ".",
  build: {
    outDir: "dist-demo",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  resolve: {
    alias: {
      components: resolve(__dirname, "lib/components"),
      hooks: resolve(__dirname, "lib/hooks"),
      assets: resolve(__dirname, "lib/assets"),
      i18: resolve(__dirname, "lib/i18"),
      lib: resolve(__dirname, "lib"),
    },
  },
})
