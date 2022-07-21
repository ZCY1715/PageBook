<script>
import GoTop from '../assets/svgs/GoTop.svg?vueComponent'
import useStore from '../store'

export default {
  data() {
    return {
      translateY: '',
      scrollTop: 0,
      store: useStore(),
    }
  },
  components: { GoTop },
  methods: {
    initScrollTop() {
      if (this.el) {
        this.scrollTop = this.el.scrollTop
        this.translateY = this.scrollTo === 0 ? '-100vh' : '0'
        this.el.addEventListener("scroll", () => {
          this.scrollTop = this.el.scrollTop
        })
      }
    }
  },
  computed: {
    el() {
      return this.store.scrollNode
    }
  },
  watch: {
    scrollTop(now) {
      this.translateY = now === 0 ? '-100vh' : '0'
    },
    el() {
      this.initScrollTop()
    }
  },
  mounted() {
    this.initScrollTop()
  },
  beforeUnmount() {
    this.el.removeEventListener("scroll", () => {
      this.scrollTop = this.el.scrollTop
    })
  }
}
</script>

<template>
  <span @click="() => el.scrollTo({ top: 0 })" :class="$style.gotop" :style="'--h: ' + translateY">
    <GoTop />
  </span>
</template>

<style module>
.gotop {
  transition: 1s;
  transform: translateY(var(--h));
}
</style>