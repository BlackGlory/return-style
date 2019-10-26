export function getErrorPromise<T>(promise: PromiseLike<unknown>): Promise<T | null>
export function getErrorPromise<T>(promise: PromiseLike<unknown>, defaultValue: T): Promise<T>
export function getErrorPromise(promise: PromiseLike<unknown>, defaultValue = null) {
  return (async () => {
    try {
      await promise
    } catch (err) {
      return err
    }
    return defaultValue
  })()
}
