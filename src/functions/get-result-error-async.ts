import { Awaitable } from '@blackglory/prelude'

export async function getResultErrorAsync<X = Error, T = unknown>(
  fn: () => Awaitable<T>
): Promise<[result: T, error: undefined] | [result: undefined, error: X]> {
  try {
    const result = await fn()
    return [result, void 0]
  } catch (e: any) {
    return [void 0, e]
  }
}
