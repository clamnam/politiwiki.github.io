import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ["recharts"],
    esbuildOptions: {
      // Fix node module resolution issues
      resolveExtensions: ['.js', '.jsx', '.ts', '.tsx'],
      mainFields: ['module', 'main']
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@node": path.resolve(__dirname, "./node_modules"),
    },
  },
})
