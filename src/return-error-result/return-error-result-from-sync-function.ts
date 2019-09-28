import { isPromise } from 'extra-promise'

export function returnErrorResultFromSyncFunction<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => Result): (...args: Args) => [Error, null] | [null, Result] {
  return function (this: unknown, ...args: Args) {
    let result: Result
    try {
      result = fn.apply(this, args)
    } catch (err) {
      return [err, null]
    }
    return [null, result]
  }
}
