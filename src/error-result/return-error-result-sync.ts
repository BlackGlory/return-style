import { returnCustomSync } from '../custom/return-custom-sync'

export function returnErrorResultSync<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => Result): (...args: Args) => [Error, null] | [null, Result] {
  return returnCustomSync<[null, Result], [Error, null], Args>(
    result => [null, result]
  , error => [error, null]
  , fn
  )
}
