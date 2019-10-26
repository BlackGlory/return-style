import { returnResultErrorAsync } from './return-result-error-async'

export function getResultErrorAsync<Error, Result>(fn: () => PromiseLike<Result>): Promise<[null, Error] | [Result, null]> {
  return returnResultErrorAsync<Error, Result>(fn)()
}
