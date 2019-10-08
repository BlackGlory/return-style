import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnResultFromSyncFunction } from './return-result-from-sync-function'

export function returnResultFromSyncConstructor<T, U extends unknown[] = any[]>(fn: new (...args: U) => T): (...args: U) => T | null
export function returnResultFromSyncConstructor<T, U extends unknown[] = any[]>(fn: new (...args: U) => T, defaultValue: T): (...args: U) => T
export function returnResultFromSyncConstructor<T, U extends unknown[] = any[]>(fn: new (...args: U) => T, defaultValue = null) {
  return returnResultFromSyncFunction(convertConstructorToFunction(fn), defaultValue)
}
