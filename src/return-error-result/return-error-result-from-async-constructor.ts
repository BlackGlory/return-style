import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnErrorResultFromAsyncFunction } from './return-error-result-from-async-function'

export function returnErrorResultFromAsyncConstructor<Error, Result, Args extends unknown[] = any[]>(fn: new (...args: Args) => PromiseLike<Result>): (...args: Args) => Promise<[Error, null] | [null, Result]> {
  return returnErrorResultFromAsyncFunction<Error, Result, Args>(convertConstructorToFunction(fn))
}
