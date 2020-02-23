import { convertConstructorToFunction } from '../utils/convert-constructor-to-function'
import { returnResultError } from './return-result-error'

export function newResultError<Result, Error, Args extends unknown[] = any[]>(fn: new (...args: Args) => Result): (...args: Args) => [null, Error] | [Result, null]
export function newResultError<Result, Error, Args extends unknown[] = any[]>(fn: new (...args: Args) => PromiseLike<Result>): (...args: Args) => Promise<[null, Error] | [Result, null]>
export function newResultError<Result, Error, Args extends unknown[] = any[]>(fn: new (...args: Args) => Result | PromiseLike<Result>) {
  return returnResultError<Result, Error, Args>(convertConstructorToFunction(fn))
}
