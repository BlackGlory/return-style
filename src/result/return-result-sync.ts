export function returnResultSync<T, U extends unknown[] = any[]>(fn: (...args: U) => T): (...args: U) => T | null
export function returnResultSync<T, U extends unknown[] = any[]>(fn: (...args: U) => T, defaultValue: T): (...args: U) => T
export function returnResultSync<T, U extends unknown[] = any[]>(fn: (...args: U) => T, defaultValue = null) {
  return function (this: unknown, ...args: U) {
    try {
      return Reflect.apply(fn, this, args)
    } catch {
      return defaultValue
    }
  }
}
