import { returnResultError } from './return-result-error'
import { getResultErrorPromise } from './get-result-error-promise'

export function getResultError<Error, Result>(promise: PromiseLike<Result>): Promise<[null, Error] | [Result, null]>
export function getResultError<Error, Result>(fn: () => Result): [null, Error] | [Result, null]
export function getResultError<Error, Result>(fn: () => PromiseLike<Result>): Promise<[null, Error] | [Result, null]>
export function getResultError<Error, Result>(promiseOrFn: PromiseLike<Result> | (() => Result | PromiseLike<Result>)) {
  if (typeof promiseOrFn === 'function') {
    return returnResultError<Error, Result>(promiseOrFn)()
  } else {
    return getResultErrorPromise<Error, Result>(promiseOrFn)
  }
}
