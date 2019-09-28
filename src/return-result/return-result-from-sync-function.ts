export function returnResultFromSyncFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => T): (...args: U) => T | null {
  return function (this: unknown, ...args: U) {
    try {
      return fn.apply(this, args)
    } catch (err) {
      return null
    }
  }
}
