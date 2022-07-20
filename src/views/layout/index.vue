<script>
import ThemeSwitcher from '../../components/ThemeSwitcher.vue'

export default {
  components: { ThemeSwitcher }
}

</script>

<template>
  <div :class="[$style.container, 'scrollY']">
    <ThemeSwitcher :class="$style.switcher" />
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

.switcher {
  position: fixed;
  top: 30px;
  right: 30px;
}
</style>