import { returnResultFromFunction } from './return-result-from-function'
import { returnResultFromPromise } from './return-result-from-promise'

export function returnResult<T>(promise: PromiseLike<T>): Promise<T | null>
export function returnResult<T, U extends unknown[] = any[]>(fn: (...args: U) => T | PromiseLike<T>): (...args: U) => Promise<T | null>
export function returnResult<T, U extends unknown[] = any[]>(promiseOrFn: PromiseLike<T> | ((...args: U) => T | PromiseLike<T>)) {
  if (typeof promiseOrFn === 'function') {
    const fn = promiseOrFn
    return returnResultFromFunction(fn)
  } else {
    const promise = promiseOrFn
    return returnResultFromPromise(promise)
  }
}
