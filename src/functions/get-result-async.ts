import { AsyncResult } from '@src/classes/async-result'

export function getResultAsync<T, X>(promise: PromiseLike<T>): AsyncResult<T, X> {
  return new AsyncResult<T, X>(promise)
}
