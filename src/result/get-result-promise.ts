export function getResultPromise<T>(promise: PromiseLike<T>): Promise<T | null>
export function getResultPromise<T>(promise: PromiseLike<T>, defaultValue: T): Promise<T>
export function getResultPromise<T>(promise: PromiseLike<T>, defaultValue = null) {
  return (async () => {
    try {
      return await promise
    } catch {
      return defaultValue
    }
  })()
}
