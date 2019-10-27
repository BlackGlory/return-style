export function returnCustomAsync<CustomResolvedStyle, CustomRejectedStyle, Args extends unknown[] = any[]>(
  resolve: (result: any) => CustomResolvedStyle
, reject: (error: any) => CustomRejectedStyle
, fn: (...args: Args) => PromiseLike<unknown>
): (...args: Args) => Promise<CustomResolvedStyle | CustomRejectedStyle> {
  return async function (this: unknown, ...args: Args) {
    let result: unknown
    try {
      result = await Promise.resolve(Reflect.apply(fn, this, args))
    } catch (err) {
      return reject(err)
    }
    return resolve(result)
  }
}
