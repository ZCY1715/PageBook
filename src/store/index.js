import { defineStore } from 'pinia'
import ThemeColorSwitcher from '../utils/themeColorImport'
import config from '../utils/config.yaml'
import { Drawer } from '../utils'

const useStore = defineStore('store', {
  state() {
    return {
      drawer: new Drawer(),
      themeColor: new ThemeColorSwitcher(),
      randomImgAPI: 'https://www.dmoe.cc/random.php',
      config,
    }
  },
  actions: {
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
        paths: ['themeColor', 'drawer']
      },
      {
        storage: localStorage,
        paths: []
      }
    ]
  }
})

export default useStore