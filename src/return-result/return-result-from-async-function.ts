export function returnResultFromAsyncFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<T>): (...args: U) => Promise<T | null> {
  return async function (this: unknown, ...args: U) {
    try {
      return await Promise.resolve(fn.apply(this, args))
    } catch (err) {
      return null
    }
  }
}
