export function returnErrorFromFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => unknown | PromiseLike<unknown>): (...args: U) => Promise<T | null> {
  return async function (this: unknown, ...args: U): Promise<T | null> {
    try {
      await Promise.resolve(fn.apply(this, args))
    } catch (err) {
      return err
    }
    return null
  }
}
