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
  watch: {
    $route() {
      this.$el.scrollTo({ top: 0 })
    }
  },
  mounted() {
    this.store.scrollNode = this.$el
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