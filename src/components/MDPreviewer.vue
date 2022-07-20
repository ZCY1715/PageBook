<script>
import useStore from '../store'
import { clone } from '../utils'

export default {
  data() {
    return {
      store: useStore(),
      md: null,
      toc: []
      /* 
        toc: [
          {
            value: '',
            node: Element,
            children: []
          }
        ]
      */
    }
  },
  props: ['id'],
  computed: {
    tocLevel() {
      return this.store.config.tocLevel
    }
  },
  methods: {
    createToc() {
      const level = clone(this.tocLevel)
      const MAX_LEVEL = 6
      let count = 1
      let nowLevel = 0
      this.toc = [{

      }]
      while (count <= MAX_LEVEL) {
        const nodes = this.$el.querySelectorAll('h' + count)
        if (!Boolean(nodes)) {
          count++
          continue
        }
        nowLevel++

      }
    }
  },
  created() {
    this.md = this.store.dataSet.import(this.id)
  },
  mounted() {

  }
}

</script>

<template>
  <component :is="md" />
</template>

<style>
.markdown-body pre {
  margin: 20px;
}

.markdown-body pre>code {
  color: #000 !important;
  line-height: 25px;
}

.markdown-body a {
  text-decoration: underline;
  padding: 3px 5px 3px 5px;
}

.markdown-body a * {
  cursor: var(--pointer);
}

.markdown-body :not(pre)>code {
  background-color: var(--theme-color);
  margin: 3px 5px 3px 5px;
  padding: 3px 5px 3px 5px;
}

.markdown-body ol li {
  list-style-position: inside;
  list-style-type: disc;
  line-height: 30px;
}

.markdown-body ol li::marker {
  color: var(--theme-color);
  font-size: 20px;
}

.markdown-body p,
.markdown-body ul,
.markdown-body ul li {
  font-size: 18px;
}
</style>