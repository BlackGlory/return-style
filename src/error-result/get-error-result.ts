import { returnErrorResult } from './return-error-result'
import { getErrorResultPromise } from './get-error-result-promise'

export function getErrorResult<Error, Result>(promise: PromiseLike<Result>): Promise<[Error, null] | [null, Result]>
export function getErrorResult<Error, Result>(fn: () => Result): [Error, null] | [null, Result]
export function getErrorResult<Error, Result>(fn: () => PromiseLike<Result>): Promise<[Error, null] | [null, Result]>
export function getErrorResult<Error, Result>(promiseOrFn: PromiseLike<Result> | (() => Result | PromiseLike<Result>)) {
  if (typeof promiseOrFn === 'function') {
    return returnErrorResult<Error, Result>(promiseOrFn)()
  } else {
    return getErrorResultPromise<Error, Result>(promiseOrFn)
  }
}
