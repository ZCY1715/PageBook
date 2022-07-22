import { defineStore } from 'pinia'
import ThemeColorSwitcher from '../utils/themeColorImport'
import config from '../core/config.yaml'
import { Drawer } from '../utils'
import DataSet from '../core'

const useStore = defineStore('store', {
  state() {
    return {
      drawer: new Drawer(),
      themeColor: new ThemeColorSwitcher(),
      dataSet: new DataSet(),
      randomImg: {
        api: 'https://www.dmoe.cc/random.php',
        randomNonce: 0,
      },
      scrollNode: null,
      scrollData: {
        routeHistory: [],
        currentScrollTop: 0,
      },
      config,
    }
  },
  getters: {

  },
  actions: {
    randomImgAPI() {
      this.randomImg.randomNonce = Math.round(Math.random() * 100000000)
      const nonce = this.randomImg.randomNonce
      const api = this.config.randomImgAPI || this.randomImg.api
      return `${api}?i=${nonce}`
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
        paths: [
          'themeColor',
          'drawer',
          'scrollData',
        ]
      },
      {
        storage: localStorage,
        paths: [
          'randomImg'
        ]
      }
    ]
  }
})

export default useStore