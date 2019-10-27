import { returnCustom } from '../custom/return-custom'

export function returnResultError<Result, Error, Args extends unknown[] = any[]>(fn: (...args: Args) => Result): (...args: Args) => [null, Error] | [Result, null]
export function returnResultError<Result, Error, Args extends unknown[] = any[]>(fn: (...args: Args) => PromiseLike<Result>): (...args: Args) => Promise<[null, Error] | [Result, null]>
export function returnResultError<Result, Error, Args extends unknown[] = any[]>(fn: (...args: Args) => Result | PromiseLike<Result>): (...args: Args) => ([null, Error] | [Result, null]) | Promise<[null, Error] | [Result, null]> // for returnResultFromConstructor
export function returnResultError<Result, Args extends unknown[] = any[]>(fn: (...args: Args) => Result | PromiseLike<Result>) {
  return returnCustom<[Result, null], [null, Error], Args>(
    result => [result, null]
  , error => [null, error]
  , fn
  )
}
