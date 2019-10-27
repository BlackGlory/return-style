import { returnCustom } from '../custom/return-custom'

export function returnError<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<unknown>): (...args: U) => Promise<T | null>
export function returnError<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<unknown>, defaultValue: T): (...args: U) => Promise<T>
export function returnError<T, U extends unknown[] = any[]>(fn: (...args: U) => unknown): (...args: U) => T | null
export function returnError<T, U extends unknown[] = any[]>(fn: (...args: U) => unknown, defaultValue: T): (...args: U) => T
export function returnError<T, U extends unknown[] = any[]>(fn: (...args: U) => unknown | PromiseLike<unknown>, defaultValue = null) {
  return returnCustom<null, T, U>(
    _ => defaultValue
  , error => error
  , fn
  )
}
