import { returnErrorResultFromFunction } from './return-error-result-from-function'
import { returnErrorResultFromPromise } from './return-error-result-from-promise'

export function returnErrorResult<Error, Result>(promise: PromiseLike<Result>): Promise<[Error, null] | [null, Result]>
export function returnErrorResult<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => PromiseLike<Result>): (...args: Args) => Promise<[Error, null] | [null, Result]>
export function returnErrorResult<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => Result): (...args: Args) => [Error, null] | [null, Result]
export function returnErrorResult<Error, Result, Args extends unknown[]>(promiseOrFn: PromiseLike<Result> | ((...args: Args) => Result | PromiseLike<Result>)) {
  if (typeof promiseOrFn === 'function') {
    return returnErrorResultFromFunction(promiseOrFn) as
      ((...args: Args) => [Error, null] | [null, Result])
    | ((...args: Args) => Promise<[Error, null] | [null, Result]>)
  } else {
    return returnErrorResultFromPromise(promiseOrFn)
  }
}
