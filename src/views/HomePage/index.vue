<script>
import Banner from './Banner.vue'
import useStore from '../../store'

export default {
  data() {
    return {
      store: useStore(),
    }
  },
  components: { Banner },
  methods: {
    handleClick() {
      const id = this.store.dataSet.Mds[0].id
      this.$router.push({ name: 'DetailPage', params: { id } })
    }
  }
}
</script>

<template>
  <Banner />
  <div style="height: 2000px;width: 100%;" @click="handleClick"></div>
</template>

<style module>
</style>