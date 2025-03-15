import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as pathlib from "node:path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": pathlib.resolve(__dirname, "./src")
    }
  }
})
