<script>
import useStore from '../store'
import Clipboard from 'clipboard'

export default {
  data() {
    return {
      store: useStore(),
      md: null,
      toc: [],
      elementInViewIndex: 0,
    }
  },
  props: ['id'],
  computed: {
    scrollNode() {
      return this.store.scrollNode
    },
    scrollTop() {
      return this.store.scrollData.currentScrollTop
    },
    tocTop() {
      return Math.max(this.scrollTop - 350, 30)
    },
    tocLevel() {
      return this.store.config.tocLevel
    },
    copySuffix() {
      return this.store.config.copySuffix
    },
    copyLimite() {
      return this.store.config.copyLimite
    },
  },
  methods: {
    createToc() {
      const titles = Array.from(this.$el.querySelectorAll(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].slice(0, this.tocLevel).join(",")))
      this.toc = titles.map(item => ({
        value: item.innerText,
        element: item,
        level: item.nodeName.slice(1)
      }))
    },
    scrollHandle() {
      const containerHeight = this.scrollNode.clientHeight
      for (let i = 0; i < this.toc.length; i++) {
        const element = this.toc[i].element
        const { top, bottom } = element.getBoundingClientRect()
        if (top >= 0 && bottom <= containerHeight) {
          this.elementInViewIndex = i
          return
        }
      }
    },
    createCopyBth() {
      const preNodes = document.querySelectorAll(".markdown-body pre")
      for (const preNode of preNodes) {
        const copyNode = document.createElement("span")
        copyNode.innerText = "复制"
        copyNode.className = 'copyBth'
        preNode.parentNode.appendChild(copyNode)
        const clipboard = new Clipboard(copyNode, {
          target: () => preNode,
          text: () => {
            const content = preNode.innerText
            return content.length < this.copyLimite ? content : content + "\n" + this.copySuffix
          }
        })
        clipboard.on("success", e => {
          const node = e.trigger
          node.className = "copySuccess"
          node.innerText = "成功"
          setTimeout(() => {
            node.innerText = "复制"
            node.className = 'copyBth'
          }, 1000)
        })
      }
    }
  },
  watch: {
    scrollTop() {
      this.scrollHandle()
    }
  },
  created() {
    this.md = this.store.dataSet.import(this.id)
  },
  mounted() {
    this.createToc()
    this.createCopyBth()
  },
}

</script>

<template>
  <div :class="$style.container">
    <component :is="md" />
    <div :class="$style.rightBar">
      <div :class="[$style.toc, 'scrollY']" :style="'--h: ' + tocTop + 'px; --z: ' + toc.length">
        <span v-for="item of toc" :key="item.value" @click="() => item.element.scrollIntoView()"
          :style="'--i:' + item.level">{{
              item.value
          }}</span>
        <span :class="$style.chooseLight" :style="'--itemIndex: ' + elementInViewIndex"></span>
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  width: 100%;
  display: flex;
}

.rightBar {
  width: 250px;
  min-width: 250px;
  margin-left: 30px;
  margin-top: 30px;
  position: relative;
  right: 0;
  display: inline-flex;
}

.toc {
  width: 100%;
  position: relative;
  top: var(--h);
  background-color: var(--toc-background);
  transition-property: top, background-color;
  transition-duration: 0s, .3s;
  height: min(400px, calc(30px + 30px * var(--z)));
  padding: 20px 10px 20px 10px;
  border-radius: 10px 0 0 10px;
}

.toc>:not(:last-child) {
  position: relative;
  z-index: 3;
  display: block;
  align-items: center;
  height: 30px;
  width: 90%;
  text-indent: calc(15px * var(--i));
  border-radius: 5px;
  font-size: calc(20px - 1px * var(--i));
  cursor: var(--pointer);
  line-height: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.toc>:not(:last-child):hover {
  background-color: var(--theme-color);
  filter: brightness(1.1);
}

.chooseLight {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 30px;
  border-radius: 5px;
  background-color: var(--theme-color);
  left: 0;
  top: calc(30px * var(--itemIndex));
  margin-top: 20px;
  padding-right: 10px;
}
</style>

<style>
.markdown-body {
  flex-grow: 1;
}

.markdown-body .code-block {
  position: relative;
}

.markdown-body pre {
  margin: 20px;
}

.markdown-body pre:hover+.copyBth,
.markdown-body pre:hover+.copySuccess,
.copyBth:hover,
.copySuccess:hover {
  opacity: 1;
}

.copyBth,
.copySuccess {
  position: absolute;
  right: 20px;
  top: 20px;
  padding: 5px 10px 5px 10px;
  border-radius: 10px;
  opacity: 0;
  cursor: var(--pointer);
  color: #fff;
  transition: 1s;
}

.copyBth {
  background-color: rgb(137, 205, 250);
}

.copySuccess {
  background-color: greenyellow;
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

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  position: relative;
  padding-left: 30px;
  padding-bottom: 5px;
  padding-top: 10px;
}

.markdown-body h1::before,
.markdown-body h2::before,
.markdown-body h3::before,
.markdown-body h4::before,
.markdown-body h5::before,
.markdown-body h6::before {
  content: "※";
  position: absolute;
  left: -5px;
  color: var(--theme-color);
  animation: showAndHide 2s linear infinite;
}

.markdown-body blockquote {
  position: relative;
  margin-left: 10px;
  padding-left: 10px;
}

.markdown-body blockquote::before {
  content: "";
  position: absolute;
  left: 0px;
  width: 3px;
  height: 100%;
  background-color: var(--toc-background);
}

@keyframes showAndHide {
  from {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.markdown-body h1::after,
.markdown-body h2::after,
.markdown-body h3::after,
.markdown-body h4::after,
.markdown-body h5::after,
.markdown-body h6::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 0;
  height: 4px;
  width: 0;
  background-color: var(--theme-color);
  transition: 1s;
}

.markdown-body h1:hover::after,
.markdown-body h2:hover::after,
.markdown-body h3:hover::after,
.markdown-body h4:hover::after,
.markdown-body h5:hover::after,
.markdown-body h6:hover::after {
  width: 70%;
}
</style>
