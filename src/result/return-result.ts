import { returnCustom } from '../custom/return-custom'

export function returnResult<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<T>): (...args: U) => Promise<T | null>
export function returnResult<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<T>, defaultValue: T): (...args: U) => Promise<T>
export function returnResult<T, U extends unknown[] = any[]>(fn: (...args: U) => T): (...args: U) => T | null
export function returnResult<T, U extends unknown[] = any[]>(fn: (...args: U) => T, defaultValue: T): (...args: U) => T
export function returnResult<T, U extends unknown[] = any[]>(fn: (...args: U) => T | PromiseLike<T>, defaultValue = null) {
  return returnCustom<T, null, U>(
    result => result
  , _ => defaultValue
  , fn
  )
}
