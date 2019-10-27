import { returnCustomSync } from '../custom/return-custom-sync'

export function returnErrorSync<T, U extends unknown[] = any[]>(fn: (...args: U) => unknown): (...args: U) => T | null
export function returnErrorSync<T, U extends unknown[] = any[]>(fn: (...args: U) => unknown, defaultValue: T): (...args: U) => T
export function returnErrorSync<T, U extends unknown[] = any[]>(fn: (...args: U) => unknown, defaultValue = null) {
  return returnCustomSync<null, T, U>(
    _ => defaultValue
  , error => error
  , fn
  )
}
