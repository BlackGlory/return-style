export function returnErrorFromPromise<T>(promise: PromiseLike<unknown>): Promise<T | null> {
  return (async () => {
    try {
      await promise
    } catch (err) {
      return err
    }
    return null
  })()
}
