export function returnErrorAsync<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<unknown>): (...args: U) => Promise<T | null>
export function returnErrorAsync<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<unknown>, defaultValue: T): (...args: U) => Promise<T>
export function returnErrorAsync<U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<unknown>, defaultValue = null) {
  return async function (this: unknown, ...args: U) {
    try {
      await Promise.resolve(Reflect.apply(fn, this, args))
    } catch (err) {
      return err
    }
    return defaultValue
  }
}
