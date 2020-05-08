export async function getErrorAsyncIterable<T = Error>(iterable: AsyncIterable<unknown>): Promise<T | undefined> {
  try {
    for await (const _ of iterable) {}
  } catch (promiseError) {
    return promiseError
  }
  return
}
