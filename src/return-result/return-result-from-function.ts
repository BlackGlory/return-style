export function returnResultFromFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => T | PromiseLike<T>): (...args: U) => Promise<T | null> {
  return async function (this: unknown, ...args: U): Promise<T | null> {
    try {
      return await Promise.resolve(fn.apply(this, args))
    } catch (err) {
      return null
    }
  }
}
