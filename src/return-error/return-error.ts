import { returnErrorFromFunction } from './return-error-from-function'
import { returnErrorFromPromise } from './return-error-from-promise'

export function returnError<T>(promise: PromiseLike<unknown>): Promise<T | null>
export function returnError<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<unknown>): (...args: U) => Promise<T | null>
export function returnError<T, U extends unknown[] = any[]>(fn: (...args: U) => unknown): (...args: U) => T | null
export function returnError<T, U extends unknown[]>(promiseOrFn: PromiseLike<T> | ((...args: U) => unknown | PromiseLike<unknown>)) {
  if (typeof promiseOrFn === 'function') {
    return returnErrorFromFunction(promiseOrFn) as
      ((...args: U) => T | null)
    | ((...args: U) => Promise<T | null>)
  } else {
    return returnErrorFromPromise(promiseOrFn)
  }
}
