import { defineConfig } from 'vite'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

export default defineConfig({
  base: '/pluits/',
  plugins: [{
    name: 'github-pages-spa-fallback',
    closeBundle() {
      const index = resolve('dist/index.html')
      copyFileSync(index, resolve('dist/404.html'))
    }
  }]
})
