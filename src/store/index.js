import { defineStore } from 'pinia'
import { themeColor } from '../utils/constent'
import { initThemeColor, switchThemeColor } from '../utils/themeColorImport'
import config from '../utils/config'

const useStore = defineStore('store', {
  state() {
    return {
      DrawerIndex: Number.MAX_SAFE_INTEGER,
      themeColor: null,
      config,
    }
  },
  actions: {
    hideSidebar() {
      this.DrawerIndex = Number.MAX_SAFE_INTEGER
    },
    initThemeColor() {
      if (Boolean(this.themeColor)) {
        initThemeColor(this.themeColor)
      } else {
        this.themeColor = initThemeColor()
      }
    },
    switchThemeColor() {
      this.themeColor = this.themeColor === themeColor.DAY ? themeColor.NIGHT : themeColor.DAY
      switchThemeColor(this.themeColor)
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
        paths: ['themeColor']
      }
    ]
  }
})

export default useStore