import { returnCustomSync } from '../custom/return-custom-sync'

export function returnResultErrorSync<Result, Error, Args extends unknown[] = any[]>(fn: (...args: Args) => Result): (...args: Args) => [null, Error] | [Result, null] {
  return returnCustomSync<[Result, null], [null, Error], Args>(
    result => [result, null]
  , error => [null, error]
  , fn
  )
}
