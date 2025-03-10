import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        speaker: './pages/speaker/index.html',
        stealth: './pages/stealth/index.html'
      }
    }
  }
}) 