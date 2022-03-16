import { Awaitable } from '@blackglory/prelude'

export async function getFailureAsync<X = Error>(
  fn: () => Awaitable<unknown>
): Promise<[failed: true, error: X] | [failed: false, error: undefined]> {
  try {
    await fn()
    return [false, void 0]
  } catch (e: any) {
    return [true, e]
  }
}
