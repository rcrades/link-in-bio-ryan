import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'pages/admin/index.html'),
        speaker: resolve(__dirname, 'pages/speaker/index.html'),
        'start-with-v0': resolve(__dirname, 'pages/start-with-v0/index.html'),
        'groundbreak-pitch': resolve(__dirname, 'pages/groundbreak/index.html'),
        'groundbreak-thesis': resolve(__dirname, 'pages/groundbreak/thesis/index.html'),
        'groundbreak-dossier': resolve(__dirname, 'pages/groundbreak/dossier/index.html'),
        'groundbreak-preview': resolve(__dirname, 'pages/groundbreak/preview/index.html')
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true
  },
  appType: 'spa'
}) 