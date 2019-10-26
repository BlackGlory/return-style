import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnResult } from './return-result'

export function newResult<T, U extends unknown[] = any[]>(fn: new (...args: U) => PromiseLike<T>): (...args: U) => Promise<T | null>
export function newResult<T, U extends unknown[] = any[]>(fn: new (...args: U) => PromiseLike<T>, defaultValue: T): (...args: U) => Promise<T>
export function newResult<T, U extends unknown[] = any[]>(fn: new (...args: U) => T): (...args: U) => T | null
export function newResult<T, U extends unknown[] = any[]>(fn: new (...args: U) => T, defaultValue: T): (...args: U) => T
export function newResult<T, U extends unknown[] = any[]>(fn: new (...args: U) => T | PromiseLike<T>, defaultValue = null) {
  return returnResult(convertConstructorToFunction(fn), defaultValue)
}
