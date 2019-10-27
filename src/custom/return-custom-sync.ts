import { isPromise } from 'extra-promise'

export function returnCustomSync<CustomResolvedStyle, CustomRejectedStyle, Args extends unknown[] = any[]>(
  resolve: (result: any) => CustomResolvedStyle
, reject: (error: any) => CustomRejectedStyle
, fn: (...args: Args) => unknown
): (...args: Args) => CustomResolvedStyle | CustomRejectedStyle {
  return function (this: unknown, ...args: Args) {
    let result: unknown
    try {
      result = Reflect.apply(fn, this, args)
    } catch (err) {
      return reject(err)
    }
    if (isPromise(result)) Promise.resolve(result).catch(() => {})
    return resolve(result)
  }
}
