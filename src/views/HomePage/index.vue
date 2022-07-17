<script>
import useStore from "../../store"

export default {
  data() {
    return {
      store: useStore(),
    }
  }
}

</script>

<template>
  <img :src="store.config.bannerImg" :class="$style.bannerImg">
</template>

<style module>
.bannerImg {
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}
</style>