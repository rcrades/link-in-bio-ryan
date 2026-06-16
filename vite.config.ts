import { defineConfig, type Plugin } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

const cleanHeadshotsRoute = (): Plugin => ({
  name: 'clean-headshots-route',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === '/headshots') {
        req.url = '/headshots/'
      }
      next()
    })
  }
})

export default defineConfig({
  plugins: [cleanHeadshotsRoute(), react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'pages/admin/index.html'),
        agents: resolve(__dirname, 'agents/index.html'),
        'guest-brief': resolve(__dirname, 'pages/guest-brief/index.html'),
        speaker: resolve(__dirname, 'pages/speaker/index.html'),
        'start-with-v0': resolve(__dirname, 'pages/start-with-v0/index.html'),
        'groundbreak-pitch': resolve(__dirname, 'pages/groundbreak/index.html'),
        'groundbreak-thesis': resolve(__dirname, 'pages/groundbreak/thesis/index.html'),
        'groundbreak-dossier': resolve(__dirname, 'pages/groundbreak/dossier/index.html'),
        'groundbreak-preview': resolve(__dirname, 'pages/groundbreak/preview/index.html'),
        headshots: resolve(__dirname, 'headshots/index.html'),
        'youtube-banner': resolve(__dirname, 'pages/youtube-banner/index.html')
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true
  },
  appType: 'spa'
})
