export async function isSuccessAsync(fn: () => PromiseLike<unknown>): Promise<boolean> {
  try {
    await fn()
    return true
  } catch {
    return false
  }
}
