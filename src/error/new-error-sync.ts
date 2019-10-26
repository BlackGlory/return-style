import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnErrorSync } from './return-error-sync'

export function newErrorSync<T, U extends unknown[] = any[]>(fn: new (...args: U) => unknown): (...args: U) => T | null
export function newErrorSync<T, U extends unknown[] = any[]>(fn: new (...args: U) => unknown, defaultValue: T): (...args: U) => T
export function newErrorSync<U extends unknown[] = any[]>(fn: new (...args: U) => unknown, defaultValue = null) {
  return returnErrorSync(convertConstructorToFunction(fn), defaultValue)
}
