import { returnCustomAsync } from '../custom/return-custom-async'

export function returnResultErrorAsync<Result, Error, Args extends unknown[] = any[]>(fn: (...args: Args) => PromiseLike<Result>): (...args: Args) => Promise<[null, Error] | [Result, null]> {
  return returnCustomAsync<[Result, null], [null, Error], Args>(
    result => [result, null]
  , error => [null, error]
  , fn
  )
}
