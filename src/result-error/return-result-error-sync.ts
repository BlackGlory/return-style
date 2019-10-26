export function returnResultErrorSync<Error, Result, Args extends unknown[] = any[]>(fn: (...args: Args) => Result): (...args: Args) => [null, Error] | [Result, null] {
  return function (this: unknown, ...args: Args) {
    let result: Result
    try {
      result = Reflect.apply(fn, this, args)
    } catch (err) {
      return [null, err]
    }
    return [result, null]
  }
}
