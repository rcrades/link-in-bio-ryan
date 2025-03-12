import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'pages/admin/index.html'),
        speaker: resolve(__dirname, 'pages/speaker/index.html'),
        stealth: resolve(__dirname, 'pages/stealth/index.html')
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true
  },
  appType: 'spa'
}) 