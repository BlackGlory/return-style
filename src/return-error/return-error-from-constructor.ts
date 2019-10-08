import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnErrorFromFunction } from './return-error-from-function'

export function returnErrorFromConstructor<T, U extends unknown[] = any[]>(fn: new (...args: U) => PromiseLike<unknown>): (...args: U) => Promise<T | null>
export function returnErrorFromConstructor<T, U extends unknown[] = any[]>(fn: new (...args: U) => unknown): (...args: U) => T | null
export function returnErrorFromConstructor(fn: new (...args: unknown[]) => unknown | PromiseLike<unknown>) {
  return returnErrorFromFunction(convertConstructorToFunction(fn))
}
