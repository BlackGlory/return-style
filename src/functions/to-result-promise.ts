import { AsyncResult, IAsyncResult } from '@classes/async-result'

export function toResultPromise<T, X = any>(promise: PromiseLike<T>): IAsyncResult<T, X> {
  return new AsyncResult<T, X>(promise)
}
