<script>
import ToolBar from '../../components/ToolBar.vue'
import useStore from '../../store'

export default {
  data() {
    return {
      store: useStore(),
    }
  },
  components: { ToolBar },
  mounted() {
    this.store.scrollNode = this.$el
    this.$el.scrollTo({ top: this.store.scrollData.currentScrollTop })
    this.$el.addEventListener("scroll", () => {
      this.store.scrollData.currentScrollTop = this.$el.scrollTop
    })
  },
  beforeUnmount() {
    this.$el.removeEventListener("scroll", () => {
      this.store.scrollData.currentScrollTop = this.$el.scrollTop
    })

  }
}

</script>

<template>
  <div :class="[$style.container, 'scrollY']">
    <ToolBar />
    <router-view />
  </div>
</template>

<style module>
.container {
  width: 100vw;
  height: 100vh;
  background-color: var(--home-background);
  position: relative;
}
</style>