import { defineConfig, type Connect, type Plugin } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// Extensionless routes that Vercel rewrites in production. The dev server needs
// the same trailing slash so the matching multi-page entry HTML resolves locally.
const CLEAN_ROUTES = ['/headshots', '/speaking/resume']

const addTrailingSlash: Connect.NextHandleFunction = (req, _res, next) => {
  if (req.url && CLEAN_ROUTES.includes(req.url)) {
    req.url = `${req.url}/`
  }
  next()
}

const cleanRoutes = (): Plugin => ({
  name: 'clean-routes',
  configureServer(server) {
    server.middlewares.use(addTrailingSlash)
  },
  configurePreviewServer(server) {
    server.middlewares.use(addTrailingSlash)
  }
})

export default defineConfig({
  plugins: [cleanRoutes(), react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'pages/admin/index.html'),
        'guest-brief': resolve(__dirname, 'pages/guest-brief/index.html'),
        speaker: resolve(__dirname, 'pages/speaker/index.html'),
        speaking: resolve(__dirname, 'speaking/index.html'),
        'speaking-resume': resolve(__dirname, 'speaking/resume/index.html'),
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
