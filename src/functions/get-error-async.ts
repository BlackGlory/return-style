import { Awaitable } from '@blackglory/prelude'

export async function getErrorAsync<X = Error>(
  fn: () => Awaitable<unknown>
): Promise<X | undefined> {
  try {
    await fn()
  } catch (err: any) {
    return err
  }
  return
}
