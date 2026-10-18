import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/** GitHub Pages 專案站：https://<user>.github.io/magia-verdict/ */
const pagesBase = process.env.GITHUB_PAGES === 'true' ? '/magia-verdict/' : '/'

export default defineConfig({
  base: pagesBase,
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 47321,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 47322,
    strictPort: true,
  },
})
