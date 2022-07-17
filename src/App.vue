<script>
import Drawer from './components/Drawer.vue'
import useStore from './store'
import live2dInit from './utils/live2DwImport'

export default {
  data() {
    return {
      drawerList: [
        {
          name: 'About',
          title: '关于',
        },
        {
          name: 'Code',
          title: '代码',
        }
      ],
      store: useStore(),
    };
  },
  methods: {
    toDrawer(index) {
      this.store.PageIndex = index
    },
  },
  components: { Drawer },
  mounted() {
    this.$nextTick(() => {
      live2dInit()
    })
  }
}
</script>

<template>
  <div :class="[$style.container, 'scrollY']">
    <Drawer v-for="(item, index) of drawerList" :data="item" :key="index" :targetIndex="store.PageIndex" :index="index"
      @switch="() => toDrawer(index)" />
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
