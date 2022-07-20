<script>
import useStore from '../store'

export default {
  data() {
    return {
      store: useStore(),
      md: null,
    }
  },
  props: ['id'],
  created() {
    this.md = this.store.dataSet.import(this.id)
  },

}

</script>

<template>
  <component :is="md" />
</template>

<style module>
</style>