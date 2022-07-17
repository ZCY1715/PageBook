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

