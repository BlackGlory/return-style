import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnErrorFromSyncFunction } from './return-error-from-sync-function'

export function returnErrorFromSyncConstructor<T, U extends unknown[] = any[]>(fn: new (...args: U) => unknown): (...args: U) => T | null {
  return returnErrorFromSyncFunction(convertConstructorToFunction(fn))
}
