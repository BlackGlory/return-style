import { isPromise } from 'extra-promise'

export function returnErrorSync<T, U extends unknown[] = any[]>(fn: (...args: U) => unknown): (...args: U) => T | null
export function returnErrorSync<T, U extends unknown[] = any[]>(fn: (...args: U) => unknown, defaultValue: T): (...args: U) => T
export function returnErrorSync<U extends unknown[] = any[]>(fn: (...args: U) => unknown, defaultValue = null) {
  return function (this: unknown, ...args: U) {
    let result: unknown
    try {
      result = Reflect.apply(fn, this, args)
    } catch (err) {
      return err
    }
    if (isPromise(result)) Promise.resolve(result).catch(() => {}) // untouchable, handle promise rejection
    return defaultValue
  }
}
