import { pass } from '@blackglory/prelude'

export async function getErrorAsyncIterable<X = Error>(
  iterable: AsyncIterable<unknown>
): Promise<X | undefined> {
  try {
    for await (const _ of iterable) {
      pass()
    }
  } catch (promiseError: any) {
    return promiseError
  }
  return
}
