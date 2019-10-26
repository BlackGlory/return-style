import { returnError } from './return-error'
import { getErrorPromise } from './get-error-promise'

export function getError<T>(promise: PromiseLike<unknown>): Promise<T | null>
export function getError<T>(promise: PromiseLike<unknown>, defaultValue: T): Promise<T>
export function getError<T>(fn: () => PromiseLike<unknown>): Promise<T | null>
export function getError<T>(fn: () => PromiseLike<unknown>, defaultValue: T): Promise<T>
export function getError<T>(fn: () => unknown): T | null
export function getError<T>(fn: () => unknown, defaultValue: T): T
export function getError(promiseOrFn: PromiseLike<unknown> | (() => unknown | PromiseLike<unknown>), defaultValue = null) {
  if (typeof promiseOrFn === 'function') {
    return returnError(promiseOrFn, defaultValue)() as any // AnyScript
  } else {
    return getErrorPromise(promiseOrFn, defaultValue)
  }
}
