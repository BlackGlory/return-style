import { isPromiseLike } from '../utils/is-promise'

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
    if (isPromiseLike(result)) Promise.resolve(result).catch(() => {})
    return resolve(result)
  }
}
