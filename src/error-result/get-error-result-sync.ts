import { returnErrorResultSync } from './return-error-result-sync'

export function getErrorResultSync<Error, Result>(fn: () => Result): [Error, null] | [null, Result] {
  return returnErrorResultSync<Error, Result>(fn)()
}
