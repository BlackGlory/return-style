export function returnErrorFromAsyncFunction<T, U extends unknown[] = any[]>(fn: (...args: U) => PromiseLike<unknown>): (...args: U) => Promise<T | null> {
  return async function (this: unknown, ...args: U) {
    try {
      await Promise.resolve(fn.apply(this, args))
    } catch (err) {
      return err
    }
    return null
  }
}
