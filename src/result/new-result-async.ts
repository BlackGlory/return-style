import { convertConstructorToFunction } from '../utils/convert-constructor-to-function'
import { returnResultAsync } from './return-result-async'

export function newResultAsync<T, U extends unknown[] = any[]>(fn: new (...args: U) => PromiseLike<T>): (...args: U) => Promise<T | null>
export function newResultAsync<T, U extends unknown[] = any[]>(fn: new (...args: U) => PromiseLike<T>, defaultValue: T): (...args: U) => Promise<T>
export function newResultAsync<T, U extends unknown[] = any[]>(fn: new (...args: U) => PromiseLike<T>, defaultValue = null) {
  return returnResultAsync(convertConstructorToFunction(fn), defaultValue)
}
