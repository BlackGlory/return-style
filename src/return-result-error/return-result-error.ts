import { returnResultErrorFromFunction } from './return-result-error-from-function'
import { returnResultErrorFromPromise } from './return-result-error-from-promise'

// Why <Error, Result> instead of <Result, Error>?
// Because Result should be a optional generic type(it is impossible today).
export function returnResultError<Error, Result>(promise: PromiseLike<Result>): Promise<[null, Error] | [Result, null]>
export function returnResultError<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => PromiseLike<Result>): (...args: Args) => Promise<[null, Error] | [Result, null]>
export function returnResultError<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => Result): (...args: Args) => [null, Error] | [Result, null]
export function returnResultError<Error, Result, Args extends unknown[]>(promiseOrFn: PromiseLike<Result> | ((...args: Args) => Result | PromiseLike<Result>)) {
  if (typeof promiseOrFn === 'function') {
    return returnResultErrorFromFunction(promiseOrFn) as
      ((...args: Args) => Promise<[null, Error] | [Result, null]>)
    | ((...args: Args) => [null, Error] | [Result, null])
  } else {
    return returnResultErrorFromPromise(promiseOrFn)
  }
}
