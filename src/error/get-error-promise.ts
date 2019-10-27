import { getCustomPromise } from '../custom/get-custom-promise'

export function getErrorPromise<T>(promise: PromiseLike<unknown>): Promise<T | null>
export function getErrorPromise<T>(promise: PromiseLike<unknown>, defaultValue: T): Promise<T>
export function getErrorPromise<T>(promise: PromiseLike<unknown>, defaultValue = null) {
  return getCustomPromise<null, T>(
    _ => defaultValue
  , error => error
  , promise
  )
}
