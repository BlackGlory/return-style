import { AsyncResult } from '@src/classes/async-result'

export function toResultAsync<T, X = any>(promise: PromiseLike<T>): AsyncResult<T, X> {
  return new AsyncResult<T, X>(promise)
}
