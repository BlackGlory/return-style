import { Awaitable } from '@blackglory/prelude'
import { Option } from '@classes/option'

export async function toOptionAsync<T>(fn: () => Awaitable<T>): Promise<Option<T>> {
  try {
    const result = await fn()
    return Option.Some<T>(result)
  } catch {
    return Option.None<T>()
  }
}
