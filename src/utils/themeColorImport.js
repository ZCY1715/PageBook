import { themeColor } from './constent'

const id = "themeColor_init"


function isDay() {
  const date = new Date()
  const hour = date.getHours()
  return hour >= 7 && hour < 19
}

// 初始化，返回当前的类型
export function initThemeColor(initType = isDay() ? themeColor.DAY : themeColor.NIGHT) {
  let styleNode = document.getElementById(id)
  if (!Boolean(styleNode)) {
    styleNode = document.createElement("link")
    styleNode.id = id
    styleNode.rel = "stylesheet"
    styleNode.type = "text/css"
    const type = initType
    styleNode.href = `./themeColors/${type}.css`
    document.head.appendChild(styleNode)
    return type
  }
  const href = styleNode.href
  return ~href.indexOf(themeColor.DAY) ? themeColor.DAY : themeColor.NIGHT
}

export function switchThemeColor(type) {
  if (![themeColor.DAY, themeColor.NIGHT].includes(type)) return
  if (initThemeColor() === type) return
  document.getElementById(id).setAttribute('href', `./themeColors/${type}.css`)
}
