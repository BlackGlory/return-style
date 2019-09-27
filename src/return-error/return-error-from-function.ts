import { isPromise } from 'extra-promise'

export function returnErrorFromFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<unknown>): (...args: U) => Promise<T | null>
export function returnErrorFromFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => unknown): (...args: U) => T | null
export function returnErrorFromFunction<U extends unknown[] = any[]>(fn: (...args: U) => unknown | PromiseLike<unknown>) {
  return function (this: unknown, ...args: U) {
    let result: unknown | PromiseLike<unknown>
    try {
      result = fn.apply(this, args)
    } catch (err) {
      return err
    }
    if (isPromise(result)) {
      return (async (promise: PromiseLike<unknown>) => {
        try {
          await promise
        } catch (err) {
          return err
        }
        return null
      })(result as PromiseLike<unknown>)
    } else {
      return null
    }
  }
}
