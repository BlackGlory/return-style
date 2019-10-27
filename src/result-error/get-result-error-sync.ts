import { returnResultErrorSync } from './return-result-error-sync'

export function getResultErrorSync<Result, Error>(fn: () => Result): [null, Error] | [Result, null] {
  return returnResultErrorSync<Result, Error>(fn)()
}
