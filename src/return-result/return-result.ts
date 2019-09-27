import { returnResultFromFunction } from './return-result-from-function'
import { returnResultFromPromise } from './return-result-from-promise'

export function returnResult<T>(promise: PromiseLike<T>): Promise<T | null>
export function returnResult<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<T>): (...args: U) => Promise<T | null>
export function returnResult<T, U extends unknown[] = any[]>(fn: (...args: U) => T): (...args: U) => T | null
export function returnResult<T, U extends unknown[] = any[]>(promiseOrFn: PromiseLike<T> | ((...args: U) => T | PromiseLike<T>)) {
  if (typeof promiseOrFn === 'function') {
    return returnResultFromFunction(promiseOrFn) as
      ((...args: U) => T | null)
    | ((...args: U) => Promise<T | null>)
  } else {
    return returnResultFromPromise(promiseOrFn)
  }
}
