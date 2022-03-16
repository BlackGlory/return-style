import { go, Awaitable } from '@blackglory/prelude'
import { AsyncOptional, IAsyncOptional, Nil } from '@classes/async-optional'

export function toOptionalAsyncPartial<T>(
  isNone: (val: T) => boolean
): (fn: () => Awaitable<T>) => IAsyncOptional<T> {
  return (fn: () => PromiseLike<T> | T) => toOptionalAsync(fn, isNone)
}

export function toOptionalAsync<T>(
  fn: () => PromiseLike<T> | T
, isNone: (val: T) => boolean
): IAsyncOptional<T> {
  const promise = go(async () => {
    const result = await fn()
    if (isNone(result)) return Nil
    return result
  })

  return new AsyncOptional<T>(promise)
}
