import { returnResultErrorAsync } from './return-result-error-async'

export function getResultErrorAsync<Result, Error>(fn: () => PromiseLike<Result>): Promise<[null, Error] | [Result, null]> {
  return returnResultErrorAsync<Result, Error>(fn)()
}
