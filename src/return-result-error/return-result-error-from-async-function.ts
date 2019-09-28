export function returnResultErrorFromAsyncFunction<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => PromiseLike<Result>): (...args: Args) => Promise<[null, Error] | [Result, null]> {
  return async function (this: unknown, ...args: Args) {
    try {
      return [await Promise.resolve(fn.apply(this, args)), null]
    } catch (err) {
      return [null, err]
    }
  }
}
