import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnResultErrorSync } from './return-result-error-sync'

export function newResultErrorSync<Error, Result, Args extends unknown[] = any[]>(fn: new (...args: Args) => Result): (...args: Args) => [null, Error] | [Result, null] {
  return returnResultErrorSync<Error, Result, Args>(convertConstructorToFunction(fn))
}
