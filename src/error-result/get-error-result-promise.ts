export function getErrorResultPromise<Error, Result>(promise: PromiseLike<Result>): Promise<[Error, null] | [null, Result]> {
  return (async (): Promise<[Error, null] | [null, Result]> => {
    try {
      return [null, await promise]
    } catch (err) {
      return [err, null]
    }
  })()
}
