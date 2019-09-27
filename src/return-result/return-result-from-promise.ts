export function returnResultFromPromise<T>(promise: PromiseLike<T>): Promise<T | null> {
  return (async () => {
    try {
      return await promise
    } catch (err) {
      return null
    }
  })()
}
