export function returnErrorResultSync<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => Result): (...args: Args) => [Error, null] | [null, Result] {
  return function (this: unknown, ...args: Args) {
    let result: Result
    try {
      result = Reflect.apply(fn, this, args)
    } catch (err) {
      return [err, null]
    }
    return [null, result]
  }
}
