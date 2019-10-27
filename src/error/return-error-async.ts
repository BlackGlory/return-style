import { returnCustomAsync } from '../custom/return-custom-async'

export function returnErrorAsync<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<unknown>): (...args: U) => Promise<T | null>
export function returnErrorAsync<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<unknown>, defaultValue: T): (...args: U) => Promise<T>
export function returnErrorAsync<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<unknown>, defaultValue = null) {
  return returnCustomAsync<null, T, U>(
    _ => defaultValue
  , error => error
  , fn
  )
}
