export async function getResultAsync<T>(fn: () => PromiseLike<T>): Promise<T | undefined> {
  try {
    return await fn()
  } catch {
    return undefined
  }
}
