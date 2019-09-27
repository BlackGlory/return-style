import { isPromise } from 'extra-promise'

// Result is not optional because of https://github.com/microsoft/TypeScript/issues/14400
export function returnErrorResultFromFunction<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => Result): (...args: Args) => [Error, null] | [null, Result]
export function returnErrorResultFromFunction<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => PromiseLike<Result>): (...args: Args) => Promise<[Error, null] | [null, Result]>
export function returnErrorResultFromFunction<Result, Args extends unknown[] = any[]>(fn: (...args: Args) => Result | PromiseLike<Result>) {
  return function (this: unknown, ...args: Args) {
    let result: Result | PromiseLike<Result>
    try {
      result = fn.apply(this, args)
    } catch (err) {
      return [err, null]
    }
    if (isPromise(result)) {
      return (async (promise: PromiseLike<Result>) => {
        try {
          return [null, await promise]
        } catch (err) {
          return [err, null]
        }
      })(result as PromiseLike<Result>)
    } else {
      return [null, result]
    }
  }
}
