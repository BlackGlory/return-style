export async function isFailureAsync(promise: PromiseLike<unknown>): Promise<boolean> {
  try {
    await promise
    return false
  } catch {
    return true
  }
}
