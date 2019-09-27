import { isPromise } from 'extra-promise'

export function returnResultFromFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<T>): (...args: U) => Promise<T | null>
export function returnResultFromFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => T): (...args: U) => T | null
export function returnResultFromFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => T | PromiseLike<T>) {
  return function (this: unknown, ...args: U) {
    let result: T | PromiseLike<T>
    try {
      result = fn.apply(this, args)
    } catch (err) {
      return null
    }
    if (isPromise(result)) {
      return (async (promise: PromiseLike<T>) => {
        try {
          return await promise
        } catch (err) {
          return null
        }
      })(result as PromiseLike<T>)
    } else {
      return result
    }
  }
}
