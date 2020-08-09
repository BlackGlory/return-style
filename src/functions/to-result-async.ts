import { AsyncResult } from '@src/classes/async-result'

export function toResultAsync<T, X = any>(fn: () => PromiseLike<T>): AsyncResult<T, X> {
  try {
    const result = fn()
    return new AsyncResult(result)
  } catch (e) {
    return AsyncResult.ofErr(e)
  }
}
