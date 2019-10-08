import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnResultErrorFromFunction } from './return-result-error-from-function'

export function returnResultErrorFromConstructor<Error, Result, Args extends unknown[] = any[]>(fn: new (...args: Args) => Result): (...args: Args) => [null, Error] | [Result, null]
export function returnResultErrorFromConstructor<Error, Result, Args extends unknown[] = any[]>(fn: new (...args: Args) => PromiseLike<Result>): (...args: Args) => Promise<[null, Error] | [Result, null]>
export function returnResultErrorFromConstructor<Error, Result, Args extends unknown[] = any[]>(fn: new (...args: Args) => Result | PromiseLike<Result>) {
  return returnResultErrorFromFunction<Error, Result, Args>(convertConstructorToFunction(fn))
}
