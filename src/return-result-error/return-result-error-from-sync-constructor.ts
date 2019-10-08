import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnResultErrorFromSyncFunction } from './return-result-error-from-sync-function'

export function returnResultErrorFromSyncConstructor<Error, Result, Args extends unknown[] = any[]>(fn: new (...args: Args) => Result): (...args: Args) => [null, Error] | [Result, null] {
  return returnResultErrorFromSyncFunction<Error, Result, Args>(convertConstructorToFunction(fn))
}
