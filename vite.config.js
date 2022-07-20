import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgSprites from 'rollup-plugin-svg-sprites'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import Markdown, { code, link, meta } from 'vite-plugin-md'
import copy from 'rollup-plugin-copy'
import hljs from 'highlight.js'


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
        baseStyle: 'none',
      },
      builders: [meta(), link(), code({
        // 'base' | 'solarizedLight' | 'material' | 'dracula' | 'tomorrow' | 'duotone'
        theme: 'solarizedLight',
      })],
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(str, { language: lang }).value;
            } catch (__) { }
          }

          return ''
        }
      }
    }),
    copy({
      targets: [
        { src: './src/core/sources', dest: './public/assets', deep: true }
      ]
    })
  ],
  base: '/',
})
