import { returnErrorAsync } from './return-error-async'

export function getErrorAsync<T>(fn: () => PromiseLike<unknown>): Promise<T | null>
export function getErrorAsync<T>(fn: () => PromiseLike<unknown>, defaultValue: T): Promise<T>
export function getErrorAsync(fn: () => PromiseLike<unknown>, defaultValue = null) {
  return returnErrorAsync(fn, defaultValue)()
}
