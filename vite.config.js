import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgSprites from 'rollup-plugin-svg-sprites'
import ViteYaml from '@modyfi/vite-plugin-yaml'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgSprites({
      exclude: ['node_modules/**']
    }),
    ViteYaml(),
  ]
})
