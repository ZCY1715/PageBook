<script>
import Drawer from './components/Drawer.vue'
import useStore from './store'
import live2dInit from './utils/live2DwImport'
import { drawerList } from './routers'

export default {
  data() {
    return {
      drawerList,
      store: useStore(),
    };
  },
  methods: {
    toDrawer(index) {
      this.store.DrawerIndex = index
    },
  },
  components: { Drawer },
  mounted() {
    this.$nextTick(() => {
      this.store.initThemeColor()
      live2dInit()
    })
  }
}
</script>

<template>
  <Drawer v-for="(item, index) of drawerList" :data="item" :key="index" :targetIndex="store.DrawerIndex" :index="index"
    @switch="() => toDrawer(index)" />
  <div :class="[$style.container, 'scrollY']">
    <router-view />
  </div>
</template>

<style module>
.container {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
