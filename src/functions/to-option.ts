import { Option } from '@classes/option'

export function toOption<T>(fn: () => T): Option<T> {
  try {
    const result = fn()
    return Option.Some<T>(result)
  } catch {
    return Option.None<T>()
  }
}
