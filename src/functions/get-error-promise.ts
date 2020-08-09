export async function getErrorPromise<T = Error>(promise: PromiseLike<unknown>): Promise<T | undefined> {
  try {
    await promise
  } catch (err) {
    return err
  }
  return
}
