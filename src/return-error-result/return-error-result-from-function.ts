// Result is not optional because of https://github.com/microsoft/TypeScript/issues/14400
export function returnErrorResultFromFunction<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => Result | PromiseLike<Result>): (...args: Args) => Promise<[Error, null] | [null, Result]> {
  return async function (this: unknown, ...args: Args): Promise<[Error, null] | [null, Result]> {
    try {
      return [null, await Promise.resolve(fn.apply(this, args))]
    } catch (err) {
      return [err, null]
    }
  }
}
