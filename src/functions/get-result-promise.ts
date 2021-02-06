export async function getResultPromise<T = unknown>(promise: PromiseLike<T>): Promise<T | undefined> {
  try {
    return await promise
  } catch {
    return
  }
}
