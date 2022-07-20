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
      randomImgAPI: 'https://www.dmoe.cc/random.php?' + Math.random() * 10000,
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