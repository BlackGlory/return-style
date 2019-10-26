export function returnErrorResultAsync<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => PromiseLike<Result>): (...args: Args) => Promise<[Error, null] | [null, Result]> {
  return async function (this: unknown, ...args: Args) {
    try {
      return [null, await Promise.resolve(Reflect.apply(fn, this, args))]
    } catch (err) {
      return [err, null]
    }
  }
}
