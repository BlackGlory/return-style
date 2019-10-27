import { returnCustom } from '../custom/return-custom'

// Result is not optional because of https://github.com/microsoft/TypeScript/issues/14400
export function returnErrorResult<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => Result): (...args: Args) => [Error, null] | [null, Result]
export function returnErrorResult<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => PromiseLike<Result>): (...args: Args) => Promise<[Error, null] | [null, Result]>
export function returnErrorResult<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => Result | PromiseLike<Result>): (...args: Args) => ([Error, null] | [null, Result]) | Promise<[Error, null] | [null, Result]> // for returnErrorResultFromConstructor
export function returnErrorResult<Result, Args extends unknown[] = any[]>(fn: (...args: Args) => Result | PromiseLike<Result>) {
  return returnCustom<[null, Result], [Error, null], Args>(
    result => [null, result]
  , error => [error, null]
  , fn
  )
}
