export async function getErrorAsync<T = Error>(fn: () => PromiseLike<unknown>): Promise<T | undefined> {
  try {
    await fn()
  } catch (err) {
    return err
  }
  return
}
