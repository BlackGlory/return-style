export function returnResultFromSyncFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => T): (...args: U) => T | null
export function returnResultFromSyncFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => T, defaultValue: T): (...args: U) => T
export function returnResultFromSyncFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => T, defaultValue = null) {
  return function (this: unknown, ...args: U) {
    try {
      return fn.apply(this, args)
    } catch {
      return defaultValue
    }
  }
}
