import { isPromise } from 'extra-promise'

export function returnCustom<CustomResolvedStyle, CustomRejectedStyle, Args extends unknown[] = any[]>(
  resolve: (result: any) => CustomResolvedStyle
, reject: (error: any) => CustomRejectedStyle
, fn: (...args: Args) => unknown | PromiseLike<unknown>
): (...args: Args) => (CustomResolvedStyle | CustomRejectedStyle) | Promise<CustomResolvedStyle | CustomRejectedStyle> {
  return function (this: unknown, ...args: Args) {
    let result: unknown | PromiseLike<unknown>
    try {
      result = Reflect.apply(fn, this, args)
    } catch (err) {
      return reject(err)
    }
    if (isPromise(result)) {
      return (async (promise: PromiseLike<unknown>) => {
        let result
        try {
          result = await promise
        } catch (err) {
          return reject(err)
        }
        return resolve(result)
      })(result as PromiseLike<unknown>)
    } else {
      return resolve(result)
    }
  }
}
