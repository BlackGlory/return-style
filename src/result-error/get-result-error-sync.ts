import { returnResultErrorSync } from './return-result-error-sync'

export function getResultErrorSync<Error, Result>(fn: () => Result): [null, Error] | [Result, null] {
  return returnResultErrorSync<Error, Result>(fn)()
}
