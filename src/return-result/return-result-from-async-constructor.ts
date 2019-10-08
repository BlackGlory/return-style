import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnResultFromAsyncFunction } from './return-result-from-async-function'

export function returnResultFromAsyncConstructor<T, U extends unknown[] = any[]>(fn: new (...args: U) => PromiseLike<T>): (...args: U) => Promise<T | null>
export function returnResultFromAsyncConstructor<T, U extends unknown[] = any[]>(fn: new (...args: U) => PromiseLike<T>, defaultValue: T): (...args: U) => Promise<T>
export function returnResultFromAsyncConstructor<T, U extends unknown[] = any[]>(fn: new (...args: U) => PromiseLike<T>, defaultValue = null) {
  return returnResultFromAsyncFunction(convertConstructorToFunction(fn), defaultValue)
}
