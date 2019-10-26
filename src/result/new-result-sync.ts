import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnResultSync } from './return-result-sync'

export function newResultSync<T, U extends unknown[] = any[]>(fn: new (...args: U) => T): (...args: U) => T | null
export function newResultSync<T, U extends unknown[] = any[]>(fn: new (...args: U) => T, defaultValue: T): (...args: U) => T
export function newResultSync<T, U extends unknown[] = any[]>(fn: new (...args: U) => T, defaultValue = null) {
  return returnResultSync(convertConstructorToFunction(fn), defaultValue)
}
