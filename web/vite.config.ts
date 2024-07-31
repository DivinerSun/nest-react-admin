import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'path'
import dynamicImport from 'vite-plugin-dynamic-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dynamicImport()],
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8088/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
