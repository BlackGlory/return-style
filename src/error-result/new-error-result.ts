import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnErrorResult } from './return-error-result'

export function newErrorResult<Error, Result, Args extends unknown[] = any[]>(fn: new (...args: Args) => Result): (...args: Args) => [Error, null] | [null, Result]
export function newErrorResult<Error, Result, Args extends unknown[] = any[]>(fn: new (...args: Args) => PromiseLike<Result>): (...args: Args) => Promise<[Error, null] | [null, Result]>
export function newErrorResult<Error, Result, Args extends unknown[] = any[]>(fn: new (...args: Args) => Result | PromiseLike<Result>) {
  return returnErrorResult<Error, Result, Args>(convertConstructorToFunction(fn))
}
