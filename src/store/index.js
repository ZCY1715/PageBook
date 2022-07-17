import { defineStore } from 'pinia'
import bannerImg from '../assets/bg.jpg'


const useStore = defineStore('store', {
  state() {
    return {
      PageIndex: Number.MAX_SAFE_INTEGER,
      randomImgAPI: 'https://www.dmoe.cc/random.php',
      config: {
        bannerImg: bannerImg,
      }
    }
  },
  // persist: {
  //   enabled: true,
  //   storage: localStorage,
  //   strategies: [
  //     {
  //       storage: localStorage, // sessionStorage 
  //       paths: ['PageIndex']
  //     }
  //   ]
  // }
})

export default useStore