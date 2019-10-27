import { returnCustomSync } from '../custom/return-custom-sync'

export function returnResultSync<T, U extends unknown[] = any[]>(fn: (...args: U) => T): (...args: U) => T | null
export function returnResultSync<T, U extends unknown[] = any[]>(fn: (...args: U) => T, defaultValue: T): (...args: U) => T
export function returnResultSync<T, U extends unknown[] = any[]>(fn: (...args: U) => T, defaultValue = null) {
  return returnCustomSync<T, null, U>(
    result => result
  , _ => defaultValue
  , fn
  )
}
