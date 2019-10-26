import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnResultErrorAsync } from './return-result-error-async'

export function newResultErrorAsync<Error, Result, Args extends unknown[] = any[]>(fn: new (...args: Args) => PromiseLike<Result>): (...args: Args) => Promise<[null, Error] | [Result, null]> {
  return returnResultErrorAsync<Error, Result, Args>(convertConstructorToFunction(fn))
}
