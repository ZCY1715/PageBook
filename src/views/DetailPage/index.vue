<script>
import useStore from '../../store'
import MDPreviewer from '../../components/MDPreviewer.vue'

export default {
  data() {
    return {
      store: useStore(),
      frontmatter: {}
    }
  },
  props: ['id'],
  components: { MDPreviewer },
  created() {
    this.frontmatter = this.store.dataSet.getMdById(this.id)
  },
  computed: {
    bannerImg() {
      return this.frontmatter.img || this.store.randomImgAPI
    },
  }
}

</script>

<template>
  <div :class="$style.banner">
    <Image :src="bannerImg" :class="$style.bannerImg" />
  </div>
  <div :class="$style.content">
    <div :class="$style.mdBody">
      <MDPreviewer :id="id" />
    </div>
  </div>

</template>

<style module>
.banner {
  width: 100%;
  height: 400px;
  position: relative;
}

.bannerImg {
  width: 100%;
  height: 100%;
  position: relative;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 1;
  top: -50px;
}

.mdBody {
  background-color: var(--mdbody-background);
  box-shadow: var(--mdbody-shadow) 0 0 10px;
  width: 60%;
  min-width: 800px;
  position: relative;
  border-radius: 20px;
  padding: 60px 40px 60px 40px;
}
</style>