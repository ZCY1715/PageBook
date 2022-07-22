<script>
import Banner from './Banner.vue'
import useStore from '../../store'
import Boy from '../../assets/boy.webp'
import Girl from '../../assets/girl.webp'

export default {
  data() {
    return {
      store: useStore(),
      Boy,
      Girl,
    }
  },
  components: { Banner },
  computed: {
    isDay() {
      return this.store.themeColor.themeColor === this.store.themeColor.themeTypes.DAY
    },
    imgTop() {
      return Math.max(50, this.store.scrollData.currentScrollTop - 600)
    },
    posts() {
      const data = this.store.dataSet.getMds()
      return data.map(item => ({
        ...item,
        img: item.img || this.store.randomImgAPI()
      }))
    },
  },
  methods: {
    clickHandle() {
      const id = this.store.dataSet.Mds[0].id
      this.$router.push({ name: 'DetailPage', params: { id } })
    }
  },
  mounted() {
    console.log(this.posts)
  }
}
</script>

<template>
  <Banner />
  <div :class="$style.postContainer">
    <div :class="$style.wrapper">
      <Image :src="Boy" :class="[!isDay ? $style.invertImg : '']" :style="'--h: ' + imgTop + 'px;'" />
      <div :class="$style.content">
        <div :class="$style.noPosts" v-if="posts.length === 0">
          还未发布文章~
        </div>
        <div :class="$style.posts" v-else>
          <div v-for="(item, index) of posts" :class="[$style.postItem, index % 2 ? $style.reverseItem : '']"
            :key="item.id">
            <div :class="$style.imgBox">
              <Image :src="item.img" :class="$style.postImg" />
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <Image :src="Girl" :class="[!isDay ? $style.invertImg : '']" :style="'--h: ' + imgTop + 'px;'" />
    </div>
  </div>
</template>

<style module>
.postContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 600px;
  margin-bottom: 200px;
}

.wrapper {
  width: 80%;
  min-width: 1500px;
  padding-bottom: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--posts-background);
  box-shadow: var(--posts-background) 0 0 10px;
  top: 30px;
  position: relative;
  z-index: 20;
  border-radius: 20px;
}

.wrapper>:nth-child(1),
.wrapper>:nth-child(3) {
  width: 200px;
  height: 200px;
  position: absolute;
  z-index: 30;
  top: var(--h);
  border-radius: 20px;
}

.invertImg {
  filter: invert(100%);
}

.wrapper>:nth-child(1) {
  left: 0;
}

.wrapper>:nth-child(3) {
  right: 0;
  transform: rotateY(180deg);
}

.content {
  width: calc(100% - 400px);
  min-width: 900px;
  min-height: 200px;
  position: relative;
  top: 60px;
}

.noPosts {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
}

.posts {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.postItem {
  width: 80%;
  height: 300px;
  margin: 50px 10% 50px 10%;
  box-shadow: var(--post-shadow) 0 0 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
}

.reverseItem {
  transform: rotateY(180deg);
}

.imgBox {
  width: 450px;
  height: 100%;
  border-radius: 20px 0 0 20px;
}

.imgBox * {
  cursor: var(--pointer);
}

.postImg {
  width: 100%;
  height: 100%;
  transition: 1s;
}

.postItem:hover .postImg {
  transform: scale(1.3) rotate(15deg);
}
</style>