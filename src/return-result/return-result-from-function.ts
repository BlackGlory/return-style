import { isPromise } from 'extra-promise'

export function returnResultFromFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<T>): (...args: U) => Promise<T | null>
export function returnResultFromFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<T>, defaultValue: T): (...args: U) => Promise<T>
export function returnResultFromFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => T): (...args: U) => T | null
export function returnResultFromFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => T, defaultValue: T): (...args: U) => T
export function returnResultFromFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => T | PromiseLike<T>, defaultValue = null) {
  return function (this: unknown, ...args: U) {
    let result: T | PromiseLike<T>
    try {
      result = Reflect.apply(fn, this, args)
    } catch {
      return defaultValue
    }
    if (isPromise(result)) {
      return (async (promise: PromiseLike<T>) => {
        try {
          return await promise
        } catch {
          return defaultValue
        }
      })(result as PromiseLike<T>)
    } else {
      return result
    }
  }
}
