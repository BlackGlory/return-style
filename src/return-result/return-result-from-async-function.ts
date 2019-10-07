export function returnResultFromAsyncFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<T>): (...args: U) => Promise<T | null>
export function returnResultFromAsyncFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<T>, defaultValue: T): (...args: U) => Promise<T>
export function returnResultFromAsyncFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<T>, defaultValue = null) {
  return async function (this: unknown, ...args: U) {
    try {
      return await Promise.resolve(fn.apply(this, args))
    } catch {
      return await Promise.resolve(defaultValue)
    }
  }
}
