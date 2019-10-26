import { isPromise } from 'extra-promise'

export function returnError<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<unknown>): (...args: U) => Promise<T | null>
export function returnError<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<unknown>, defaultValue: T): (...args: U) => Promise<T>
export function returnError<T, U extends unknown[] = any[]>(fn: (...args: U) => unknown): (...args: U) => T | null
export function returnError<T, U extends unknown[] = any[]>(fn: (...args: U) => unknown, defaultValue: T): (...args: U) => T
export function returnError<U extends unknown[] = any[]>(fn: (...args: U) => unknown | PromiseLike<unknown>, defaultValue = null) {
  return function (this: unknown, ...args: U) {
    let result: unknown | PromiseLike<unknown>
    try {
      result = Reflect.apply(fn, this, args)
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
        return defaultValue
      })(result as PromiseLike<unknown>)
    } else {
      return defaultValue
    }
  }
}
