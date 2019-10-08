import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnResultErrorFromAsyncFunction } from './return-result-error-from-async-function'

export function returnResultErrorFromAsyncConstructor<Error, Result, Args extends unknown[] = any[]>(fn: new (...args: Args) => PromiseLike<Result>): (...args: Args) => Promise<[null, Error] | [Result, null]> {
  return returnResultErrorFromAsyncFunction<Error, Result, Args>(convertConstructorToFunction(fn))
}
