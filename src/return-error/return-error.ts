import { returnErrorFromFunction } from './return-error-from-function'
import { returnErrorFromPromise } from './return-error-from-promise'

export function returnError<T>(promise: PromiseLike<unknown>): Promise<T | null>
export function returnError<T, U extends unknown[] = any[]>(fn: (...args: U) => unknown | PromiseLike<unknown>): (...args: U) => Promise<T | null>
export function returnError<T, U extends unknown[]>(promiseOrFn: PromiseLike<T> | ((...args: U) => unknown | PromiseLike<unknown>)) {
  if (typeof promiseOrFn === 'function') {
    const fn = promiseOrFn
    return returnErrorFromFunction(fn)
  } else {
    const promise = promiseOrFn
    return returnErrorFromPromise(promise)
  }
}
