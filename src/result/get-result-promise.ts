import { getCustomPromise } from '../custom/get-custom-promise'

export function getResultPromise<T>(promise: PromiseLike<T>): Promise<T | null>
export function getResultPromise<T>(promise: PromiseLike<T>, defaultValue: T): Promise<T>
export function getResultPromise<T>(promise: PromiseLike<T>, defaultValue = null) {
  return getCustomPromise<T, null>(
    result => result
  , _ => defaultValue
  , promise
  )
}
