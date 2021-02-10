import { AsyncOptional, IAsyncOptional, Nil } from '@classes/async-optional'

export function toOptionalAsyncPartial<T>(isNone: (val: T) => boolean): (fn: () => PromiseLike<T> | T) => IAsyncOptional<T> {
  return (fn: () => PromiseLike<T> | T) => toOptionalAsync(fn, isNone)
}

export function toOptionalAsync<T>(fn: () => PromiseLike<T> | T, isNone: (val: T) => boolean): IAsyncOptional<T> {
  return new AsyncOptional<T>((async () => {
    const result = await fn()
    if (isNone(result)) return Nil
    return result
  })())
}
