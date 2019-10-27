import { returnCustomAsync } from '../custom/return-custom-async'

export function returnResultAsync<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<T>): (...args: U) => Promise<T | null>
export function returnResultAsync<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<T>, defaultValue: T): (...args: U) => Promise<T>
export function returnResultAsync<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<T>, defaultValue = null) {
  return returnCustomAsync<T, null, U>(
    result => result
  , _ => defaultValue
  , fn
  )
}
