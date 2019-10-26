import { returnErrorResultAsync } from './return-error-result-async'

export function getErrorResultAsync<Error, Result>(fn: () => PromiseLike<Result>): Promise<[Error, null] | [null, Result]> {
  return returnErrorResultAsync<Error, Result>(fn)()
}
