import { convertConstructorToFunction } from '../utils/convert-constructor-to-function'
import { returnResultErrorAsync } from './return-result-error-async'

export function newResultErrorAsync<Result, Error, Args extends unknown[] = any[]>(fn: new (...args: Args) => PromiseLike<Result>): (...args: Args) => Promise<[null, Error] | [Result, null]> {
  return returnResultErrorAsync<Result, Error, Args>(convertConstructorToFunction(fn))
}
