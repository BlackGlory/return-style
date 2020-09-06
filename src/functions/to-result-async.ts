import { AsyncResult, IAsyncResult } from '@classes/async-result'

export function toResultAsync<T, X = any>(fn: () => PromiseLike<T>): IAsyncResult<T, X> {
  try {
    const result = fn()
    return new AsyncResult(result)
  } catch (e) {
    return AsyncResult.Err(e)
  }
}
