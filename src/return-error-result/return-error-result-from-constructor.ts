import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnErrorResultFromFunction } from './return-error-result-from-function'

export function returnErrorResultFromConstructor<Error, Result, Args extends unknown[] = any[]>(fn: new (...args: Args) => Result): (...args: Args) => [Error, null] | [null, Result]
export function returnErrorResultFromConstructor<Error, Result, Args extends unknown[] = any[]>(fn: new (...args: Args) => PromiseLike<Result>): (...args: Args) => Promise<[Error, null] | [null, Result]>
export function returnErrorResultFromConstructor<Error, Result, Args extends unknown[] = any[]>(fn: new (...args: Args) => Result | PromiseLike<Result>) {
  return returnErrorResultFromFunction<Error, Result, Args>(convertConstructorToFunction(fn))
}
