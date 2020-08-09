import { AsyncResult } from '@src/classes/async-result'

export function toResultPromise<T, X = any>(promise: PromiseLike<T>): AsyncResult<T, X> {
  return new AsyncResult<T, X>(promise)
}
