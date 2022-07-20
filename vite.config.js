import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgSprites from 'rollup-plugin-svg-sprites'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import Markdown, { code, link, meta } from 'vite-plugin-md'
import copy from 'rollup-plugin-copy'


export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    svgSprites({
      exclude: ['node_modules/**']
    }),
    ViteYaml(),
    Markdown({
      style: {
        baseStyle: 'github',
      },
      builders: [meta(), link(), code()],
    }),
    copy({
      targets: [
        { src: './src/core/sources', dest: './public/assets', deep: true }
      ]
    })
  ],
  base: '/',
})
