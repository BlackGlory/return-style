import { returnResult } from './return-result'
import { getResultPromise } from './get-result-promise'

export function getResult<T>(promise: PromiseLike<T>): Promise<T | null>
export function getResult<T>(promise: PromiseLike<T>, defaultValue: T): Promise<T>
export function getResult<T>(fn: () => PromiseLike<T>): Promise<T | null>
export function getResult<T>(fn: () => PromiseLike<T>, defaultValue: T): Promise<T>
export function getResult<T>(fn: () => T): T | null
export function getResult<T>(fn: () => T, defaultValue: T): T
export function getResult<T>(promiseOrFn: PromiseLike<T> | (() => T | PromiseLike<T>), defaultValue = null) {
  if (typeof promiseOrFn === 'function') {
    return returnResult(promiseOrFn, defaultValue)()
  } else {
    return getResultPromise(promiseOrFn, defaultValue)
  }
}
