import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnResultFromFunction } from './return-result-from-function'

export function returnResultFromConstructor<T, U extends unknown[] = any[]>(fn: new (...args: U) => PromiseLike<T>): (...args: U) => Promise<T | null>
export function returnResultFromConstructor<T, U extends unknown[] = any[]>(fn: new (...args: U) => PromiseLike<T>, defaultValue: T): (...args: U) => Promise<T>
export function returnResultFromConstructor<T, U extends unknown[] = any[]>(fn: new (...args: U) => T): (...args: U) => T | null
export function returnResultFromConstructor<T, U extends unknown[] = any[]>(fn: new (...args: U) => T, defaultValue: T): (...args: U) => T
export function returnResultFromConstructor<T, U extends unknown[] = any[]>(fn: new (...args: U) => T | PromiseLike<T>, defaultValue = null) {
  return returnResultFromFunction(convertConstructorToFunction(fn), defaultValue)
}
