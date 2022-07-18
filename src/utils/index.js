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
