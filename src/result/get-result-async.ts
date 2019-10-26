import { returnResultAsync } from './return-result-async'

export function getResultAsync<T>(fn: () => PromiseLike<T>): Promise<T | null>
export function getResultAsync<T>(fn: () => PromiseLike<T>, defaultValue: T): Promise<T>
export function getResultAsync<T>(fn: () => PromiseLike<T>, defaultValue = null) {
  return returnResultAsync(fn, defaultValue)()
}
