import { returnResultError } from './return-result-error'
import { getResultErrorPromise } from './get-result-error-promise'

export function getResultError<Result, Error>(promise: PromiseLike<Result>): Promise<[null, Error] | [Result, null]>
export function getResultError<Result, Error>(fn: () => Result): [null, Error] | [Result, null]
export function getResultError<Result, Error>(fn: () => PromiseLike<Result>): Promise<[null, Error] | [Result, null]>
export function getResultError<Result, Error>(promiseOrFn: PromiseLike<Result> | (() => Result | PromiseLike<Result>)) {
  if (typeof promiseOrFn === 'function') {
    return returnResultError<Result, Error>(promiseOrFn)()
  } else {
    return getResultErrorPromise<Result, Error>(promiseOrFn)
  }
}
