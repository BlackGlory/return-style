export function returnResultErrorFromPromise<Result, Error>(promise: PromiseLike<Result>): Promise<[null, Error] | [Result, null]> {
  return (async (): Promise<[null, Error] | [Result, null]> => {
    try {
      return [await promise, null]
    } catch (err) {
      return [null, err]
    }
  })()
}
