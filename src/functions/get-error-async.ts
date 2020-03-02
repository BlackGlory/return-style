export async function getErrorAsync<T = Error>(promise: PromiseLike<unknown>): Promise<T | undefined> {
  try {
    await promise
  } catch (promiseError) {
    return promiseError
  }
  return
}
