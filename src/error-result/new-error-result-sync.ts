import { convertConstructorToFunction } from '../utils/convert-constructor-to-function'
import { returnErrorResultSync } from './return-error-result-sync'

export function newErrorResultSync<Error, Result, Args extends unknown[] = any[]>(fn: new (...args: Args) => Result): (...args: Args) => [Error, null] | [null, Result] {
  return returnErrorResultSync<Error, Result, Args>(convertConstructorToFunction(fn))
}
