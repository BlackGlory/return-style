import { convertConstructorToFunction } from '../convert-constructor-to-function'
import { returnResultErrorSync } from './return-result-error-sync'

export function newResultErrorSync<Result, Error, Args extends unknown[] = any[]>(fn: new (...args: Args) => Result): (...args: Args) => [null, Error] | [Result, null] {
  return returnResultErrorSync<Result, Error, Args>(convertConstructorToFunction(fn))
}
