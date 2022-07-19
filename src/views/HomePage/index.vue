<script>
import Banner from './Banner.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'

export default {
  components: { Banner, ThemeSwitcher }

}
</script>

<template>
  <Banner />
  <ThemeSwitcher :class="$style.switcher" />
  <div style="height: 2000px;width: 100%;"></div>
</template>

<style module>
.switcher {
  position: fixed;
  top: 30px;
  right: 30px;
}
</style>