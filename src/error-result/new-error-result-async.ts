import { convertConstructorToFunction } from '../utils/convert-constructor-to-function'
import { returnErrorResultAsync } from './return-error-result-async'

export function newErrorResultAsync<Error, Result, Args extends unknown[] = any[]>(fn: new (...args: Args) => PromiseLike<Result>): (...args: Args) => Promise<[Error, null] | [null, Result]> {
  return returnErrorResultAsync<Error, Result, Args>(convertConstructorToFunction(fn))
}
