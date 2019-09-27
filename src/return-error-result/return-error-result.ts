import { returnErrorResultFromFunction } from './return-error-result-from-function'
import { returnErrorResultFromPromise } from './return-error-result-from-promise'

export function returnErrorResult<Error, Result>(promise: PromiseLike<Result>): Promise<[Error, null] | [null, Result]>
export function returnErrorResult<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => Result | PromiseLike<Result>): (...args: Args) => Promise<[Error, null] | [null, Result]>
export function returnErrorResult<Result, Args extends []>(promiseOrFn: PromiseLike<Result> | ((...args: Args) => Result | PromiseLike<Result>)) {
  if (typeof promiseOrFn === 'function') {
    const fn = promiseOrFn
    return returnErrorResultFromFunction(fn)
  } else {
    const promise = promiseOrFn
    return returnErrorResultFromPromise(promise)
  }
}
