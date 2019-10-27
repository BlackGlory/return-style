import { returnCustomAsync } from '../custom/return-custom-async'

export function returnErrorResultAsync<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => PromiseLike<Result>): (...args: Args) => Promise<[Error, null] | [null, Result]> {
  return returnCustomAsync<[null, Result], [Error, null], Args>(
    result => [null, result]
  , error => [error, null]
  , fn
  )
}
