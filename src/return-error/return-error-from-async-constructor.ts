import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnErrorFromAsyncFunction } from './return-error-from-async-function'

export function returnErrorFromAsyncConstructor<T, U extends unknown[] = any[]>(fn: new (...args: U) => PromiseLike<unknown>): (...args: U) => Promise<T | null> {
  return returnErrorFromAsyncFunction(convertConstructorToFunction(fn))
}
