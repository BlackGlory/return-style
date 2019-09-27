import { returnResultErrorFromFunction } from './return-result-error-from-function'
import { returnResultErrorFromPromise } from './return-result-error-from-promise'
// Convert the async function exception handle to if-else style.

// Why <Error, Result> instead of <Result, Error>?
// Because Result should be a optional generic type(it is impossible today).
export function returnResultError<Error, Result>(promise: PromiseLike<Result>): Promise<[null, Error] | [Result, null]>
export function returnResultError<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => Result | PromiseLike<Result>): (...args: Args) => Promise<[null, Error] | [Result, null]>
export function returnResultError<Result, Args extends []>(promiseOrFn: PromiseLike<Result> | ((...args: Args) => Result | PromiseLike<Result>)) {
  if (typeof promiseOrFn === 'function') {
    const fn = promiseOrFn
    return returnResultErrorFromFunction(fn)
  } else {
    const promise = promiseOrFn
    return returnResultErrorFromPromise(promise)
  }
}
