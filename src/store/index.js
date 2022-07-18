import { defineStore } from 'pinia'
import ThemeColorSwitcher from '../utils/themeColorImport'
import config from '../utils/config'
import { Drawer } from '../utils'

const useStore = defineStore('store', {
  state() {
    return {
      drawer: new Drawer(),
      themeColor: new ThemeColorSwitcher(),
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
      }
    ]
  }
})

export default useStore