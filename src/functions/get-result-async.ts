export async function getResultAsync<T>(promise: PromiseLike<T>): Promise<T | undefined> {
  try {
    return await promise
  } catch {
    return
  }
}
