import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnResultError } from './return-result-error'

export function newResultError<Error, Result, Args extends unknown[] = any[]>(fn: new (...args: Args) => Result): (...args: Args) => [null, Error] | [Result, null]
export function newResultError<Error, Result, Args extends unknown[] = any[]>(fn: new (...args: Args) => PromiseLike<Result>): (...args: Args) => Promise<[null, Error] | [Result, null]>
export function newResultError<Error, Result, Args extends unknown[] = any[]>(fn: new (...args: Args) => Result | PromiseLike<Result>) {
  return returnResultError<Error, Result, Args>(convertConstructorToFunction(fn))
}
