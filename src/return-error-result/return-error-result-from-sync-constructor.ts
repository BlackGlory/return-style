import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnErrorResultFromSyncFunction } from './return-error-result-from-sync-function'

export function returnErrorResultFromSyncConstructor<Error, Result, Args extends unknown[] = any[]>(fn: new (...args: Args) => Result): (...args: Args) => [Error, null] | [null, Result] {
  return returnErrorResultFromSyncFunction<Error, Result, Args>(convertConstructorToFunction(fn))
}
