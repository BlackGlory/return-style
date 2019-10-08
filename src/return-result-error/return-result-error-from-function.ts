import { isPromise } from 'extra-promise'

export function returnResultErrorFromFunction<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => Result): (...args: Args) => [null, Error] | [Result, null]
export function returnResultErrorFromFunction<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => PromiseLike<Result>): (...args: Args) => Promise<[null, Error] | [Result, null]>
export function returnResultErrorFromFunction<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => Result | PromiseLike<Result>): (...args: Args) => ([null, Error] | [Result, null]) | Promise<[null, Error] | [Result, null]> // for returnResultFromConstructor
export function returnResultErrorFromFunction<Result, Args extends unknown[] = any[]>(fn: (...args: Args) => Result | PromiseLike<Result>) {
  return function (this: unknown, ...args: Args) {
    let result: Result | PromiseLike<Result>
    try {
      result = Reflect.apply(fn, this, args)
    } catch (err) {
      return [null, err]
    }
    if (isPromise(result)) {
      return (async (promise: PromiseLike<Result>) => {
        try {
          return [await promise, null]
        } catch (err) {
          return [null, err]
        }
      })(result as PromiseLike<Result>)
    } else {
      return [result, null]
    }
  }
}
