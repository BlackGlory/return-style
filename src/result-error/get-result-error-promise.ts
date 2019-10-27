import { getCustomPromise } from '../custom/get-custom-promise'

export function getResultErrorPromise<Result, Error>(promise: PromiseLike<Result>): Promise<[null, Error] | [Result, null]> {
  return getCustomPromise<[Result, null], [null, Error]>(
    result => [result, null]
  , error => [null, error]
  , promise
  )
}
