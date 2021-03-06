// 对象克隆
export function clone(target) {
  if (target === null) return null;
  if (typeof target !== 'object') return target;
  const cloneTarget = Array.isArray(target) ? [] : {};
  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = clone(target[prop]);
    }
  }
  return cloneTarget;
}

// 用于控制侧栏切换及动画
export class Drawer {

  index = Number.MAX_SAFE_INTEGER

  openTo(index) {
    this.index = index
  }

  close() {
    this.index = Number.MAX_SAFE_INTEGER
  }

  isOpened() {
    return this.index < Number.MAX_SAFE_INTEGER
  }

  isClosed() {
    return this.index === Number.MAX_SAFE_INTEGER
  }

  isClosing(from, to) {
    return from < to && to === Number.MAX_SAFE_INTEGER
  }

  isOpening(from, to) {
    return from > to && from === Number.MAX_SAFE_INTEGER
  }
}

// 字符串数组去重
export function distinct(arr) {
  return Array.from(new Set(arr))
}

// 节流
export function throttle(fn, delay) {
  let timer = null
  return () => {
    if (timer) return
    fn()
    timer = setTimeout(() => {
      timer = null
    }, delay)
  }
}

// 时间格式化
export function formateTime(date = new Date()) {
  const FixZero = num => num > 9 ? num : '0' + num
  const YYYY = date.getUTCFullYear()
  const MM = FixZero(date.getUTCMonth() + 1)
  const DD = FixZero(date.getUTCDate())
  const hh = FixZero(date.getUTCHours())
  const mm = FixZero(date.getUTCMinutes())
  const ss = FixZero(date.getUTCSeconds())
  return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`
}