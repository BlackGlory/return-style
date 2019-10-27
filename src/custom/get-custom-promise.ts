export function getCustomPromise<CustomResolvedStyle, CustomRejectedStyle>(
  resolve: (result: any) => CustomResolvedStyle
, reject: (error: any) => CustomRejectedStyle
, promise: PromiseLike<unknown>
): Promise<CustomResolvedStyle | CustomRejectedStyle> {
  return (async (): Promise<CustomResolvedStyle | CustomRejectedStyle> => {
    let result
    try {
      result = await promise
    } catch (err) {
      return reject(err)
    }
    return resolve(result)
  })()
}
