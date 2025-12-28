import { defineConfig } from "vite"
import { resolve } from "path"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts"
import { libInjectCss } from "vite-plugin-lib-inject-css"
import svgr from "vite-plugin-svgr"
import { terser } from "rollup-plugin-terser"

// Plugin to add "use client" directive to client entry point only
const addUseClientToClientEntry = () => ({
  name: "add-use-client-to-client",
  enforce: "post" as const,
  generateBundle(_options: any, bundle: any) {
    // Only add "use client" to client.js and client.cjs entry chunks
    for (const fileName in bundle) {
      if (fileName === "client.js" || fileName === "client.cjs") {
        const file = bundle[fileName]
        if (file.type === "chunk" && file.isEntry) {
          file.code = `"use client";\n${file.code}`
        }
      }
    }
  },
})

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    dts({ include: ["lib"], copyDtsFiles: true }),
    terser({
      format: {
        comments: false,
        beautify: false,
      },
      compress: {
        passes: 2, // More passes over the code for compression
        drop_console: true, // Remove console statements
        sequences: true, // Join consecutive simple statements using the "comma operator"
      },
      mangle: true, // Shorten variable names
    }),
    libInjectCss(),
    addUseClientToClientEntry(),
  ],
  resolve: {
    alias: {
      components: resolve(__dirname, "lib/components"),
      hooks: resolve(__dirname, "lib/hooks"),
      assets: resolve(__dirname, "lib/assets"),
      i18: resolve(__dirname, "lib/i18"),
      lib: resolve(__dirname, "lib"),
    },
  },
  build: {
    lib: {
      entry: {
        main: resolve(__dirname, "lib/main.ts"),
        client: resolve(__dirname, "lib/client.tsx"),
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) => `${entryName}.${format === "es" ? "js" : "cjs"}`,
    },
    copyPublicDir: false,
    rollupOptions: {
      external: (id) => {
        return id === "react" || id === "react-dom" || id.startsWith("react/") || id.startsWith("react-dom/")
      },
      output: {
        assetFileNames: "assets/[name][extname]",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
})
