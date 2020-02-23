import { convertConstructorToFunction } from '../utils/convert-constructor-to-function'
import { returnErrorAsync } from './return-error-async'

export function newErrorAsync<T, U extends unknown[] = any[]>(fn: new (...args: U) => PromiseLike<unknown>): (...args: U) => Promise<T | null>
export function newErrorAsync<T, U extends unknown[] = any[]>(fn: new (...args: U) => PromiseLike<unknown>, defaultValue: T): (...args: U) => Promise<T>
export function newErrorAsync<U extends unknown[] = any[]>(fn: new (...args: U) => PromiseLike<unknown>, defaultValue = null) {
  return returnErrorAsync(convertConstructorToFunction(fn), defaultValue)
}
