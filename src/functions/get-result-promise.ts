import { pass } from '@blackglory/prelude'

export async function getResultPromise<T>(
  promise: PromiseLike<T>
): Promise<T | undefined> {
  try {
    return await promise
  } catch {
    pass()
  }
}
