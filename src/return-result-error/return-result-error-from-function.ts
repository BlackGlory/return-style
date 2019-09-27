export function returnResultErrorFromFunction<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => Result | PromiseLike<Result>): (...args: Args) => Promise<[null, Error] | [Result, null]> {
  return async function (this: unknown, ...args: Args): Promise<[null, Error] | [Result, null]> {
    try {
      return [await Promise.resolve(fn.apply(this, args)), null]
    } catch (err) {
      return [null, err]
    }
  }
}
