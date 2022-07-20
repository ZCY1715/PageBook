<script>
import ToolBar from '../../components/ToolBar.vue'

export default {
  components: { ToolBar }
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