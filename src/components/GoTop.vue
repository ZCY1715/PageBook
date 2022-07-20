<script>
import GoTop from '../assets/svgs/GoTop.svg?vueComponent'

export default {
  data() {
    return {
      el: null,
      translateY: '',
      scrollTop: 0,
    }
  },
  components: { GoTop },
  methods: {
    goTopClick() {
      this.el.scrollTo({ top: 0 })
    }
  },
  watch: {
    scrollTop(now) {
      this.translateY = now === 0 ? '-100vh' : '0'
    }
  },
  mounted() {
    // 本层 ——> toolbar层 ——> 容器层
    this.el = this.$el.parentNode.parentNode
    this.scrollTop = this.el.scrollTop
    this.translateY = this.scrollTo === 0 ? '-100vh' : '0'
    this.el.addEventListener("scroll", () => {
      this.scrollTop = this.el.scrollTop
    })
  },
  beforeUnmount() {
    this.el.removeEventListener("scroll", () => {
      this.scrollTop = this.el.scrollTop
    })
  }
}
</script>

<template>
  <span @click="goTopClick" :class="$style.gotop" :style="'--h: ' + translateY">
    <GoTop />
  </span>
</template>

<style module>
.gotop {
  transition: 1s;
  transform: translateY(var(--h));
}
</style>