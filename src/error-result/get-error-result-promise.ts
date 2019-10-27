import { getCustomPromise } from '../custom/get-custom-promise'

export function getErrorResultPromise<Error, Result>(promise: PromiseLike<Result>): Promise<[Error, null] | [null, Result]> {
  return getCustomPromise<[null, Result], [Error, null]>(
    result => [null, result]
  , error => [error, null]
  , promise
  )
}
